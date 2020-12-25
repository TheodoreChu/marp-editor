import React from 'react';
import { EditorKit, EditorKitDelegate } from 'sn-editor-kit';
import Marp from '@marp-team/marp-core';
import { debounce } from 'lodash';
import { HelpIcon, DownloadIcon, PrintIcon } from './Icons';
/** This is important */
import '@marp-team/marp-core/lib/browser';

/** I am not sure if this is important */
import '@marp-team/marp-core/browser';
import '@marp-team/marp-core/lib/browser.cjs';
import '@marp-team/marp-core/lib/marp';

enum ComponentDataKey {
  Mode = 'mode',
}

export enum HtmlElementId {
  ColumnResizer = 'column-resizer',
  Editor = 'editor',
  EditorContainer = 'editor-container',
  Header = 'header',
  MarpContent = 'marp-content',
  MarpEditor = 'marp-editor',
  MarpStyles = 'marp-styles',
  View = 'view',
  HelpButton = 'help-button',
  DownloadButton = 'download-button',
  PrintButton = 'print-button',
}

export enum HtmlClassName {
  Dragging = 'dragging',
  NoSelection = 'no-selection',
  SnComponent = 'sn-component',
  Textarea = 'sk-input textarea',
}

type Mode = {
  type: ModeType;
  label: string;
  css: string;
};

enum ModeType {
  Edit = 0,
  Split = 1,
  View = 2,
}

const modes = [
  { type: ModeType.Edit, label: 'Edit', css: 'edit' } as Mode,
  { type: ModeType.Split, label: 'Split', css: 'split' } as Mode,
  { type: ModeType.View, label: 'View', css: 'view' } as Mode,
];

enum MouseEvent {
  Down = 'mousedown',
  Move = 'mousemove',
  Up = 'mouseup',
}

export interface EditorInterface {
  text: string;
  mode: Mode;
  platform?: string;
  printUrl: boolean;
}
const debugMode = false;

const initialState = {
  mode: modes[1],
  printUrl: false,
  text: '',
};

const keyMap = new Map();

export default class MarpEditor extends React.Component<{}, EditorInterface> {
  editorKit: any;
  saveTimer: NodeJS.Timeout | undefined;
  marp = new Marp({
    // marp-core constructor options
    html: true,
    emoji: {
      shortcode: true,
      unicode: false,
    },
    math: {
      lib: 'katex',
      katexFontPath: 'katex/v0.12.0/fonts/',
    },
    minifyCSS: false,
    script: true,

    // We can included Marpit constructor options
    // https://marpit-api.marp.app/marpit
    markdown: {
      breaks: true, // Create a <br/> on new line
    },
  });

  constructor(props: EditorInterface) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = () => {
    this.configureEditorKit();
    this.configureResizer();
  };

  configureEditorKit = () => {
    const delegate = new EditorKitDelegate({
      /** This loads every time a different note is loaded */
      setEditorRawText: (text: string) => {
        this.setState(
          {
            text,
          },
          () => {
            this.renderSlides();
            this.loadSavedMode();
          }
        );
      },
      clearUndoHistory: () => {},
      getElementsBySelector: () => [],
    });

    this.editorKit = new EditorKit({
      delegate: delegate,
      mode: 'plaintext',
      supportsFilesafe: false,
    });
  };

  saveNote = (text: string) => {
    /** This will work in an SN context, but may break the standalone editor,
     * so we need to catch the error
     */
    try {
      this.editorKit.onEditorValueChanged(text);
    } catch (error) {
      console.log('Error saving note:', error);
    }
  };

  handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target;
    const value = target.value;
    this.saveText(value);
  };

  saveText = (text: string) => {
    this.saveNote(text);
    this.setState(
      {
        text: text,
      },
      () => {
        // Do not re-render slides in edit-only mode
        if (this.state.mode !== modes[0]) {
          if (this.saveTimer) {
            clearTimeout(this.saveTimer);
          }
          debounce(() => {
            this.renderSlides();
          }, 300);
          this.saveTimer = setTimeout(() => {
            this.renderSlides();
          }, 350);
        }
      }
    );
  };

  renderSlides = () => {
    // Convert Markdown slide deck into HTML and CSS
    const { html, css } = this.marp.render(this.state.text);

    const view = document.getElementById(HtmlElementId.View);
    if (view) {
      /** This keeps the vertical scroll when rendering the slides */
      let scrollY = view.scrollTop;
      view.innerHTML = html;
      view.scrollTop = scrollY;
    }
    const MarpStyles = document.getElementById(HtmlElementId.MarpStyles);
    if (MarpStyles) {
      MarpStyles.innerHTML = css;
    }
    const MarpContent = document.getElementById(HtmlElementId.MarpContent);
    if (MarpContent) {
      MarpContent.innerHTML = html;
    }
  };

  loadSavedMode = () => {
    try {
      const savedMode = this.editorKit.internal.componentManager.componentDataValueForKey(
        ComponentDataKey.Mode
      ) as ModeType;
      if (debugMode) {
        console.log('loaded savedMode: ' + savedMode);
      }
      // We can't use if(savedMode) because it would return false for 0
      if (typeof savedMode === 'number') {
        this.setModeFromModeType(savedMode);
      }
      this.setState(
        {
          platform: this.editorKit.internal.componentManager.platform,
        },
        () => {
          if (debugMode) {
            console.log(this.state.platform);
          }
        }
      );
    } catch (e) {
      if (debugMode) {
        console.log('Error when loading saved mode: ' + e);
      }
    }
  };

  setModeFromModeType = (value: ModeType) => {
    for (const mode of modes) {
      if (mode.type === value) {
        this.logDebugMessage('setModeFromModeType mode: ', mode.type);
        this.setState(
          {
            mode,
          },
          () => {
            this.renderSlides();
          }
        );
        return;
      }
    }
  };

  changeMode = (mode: Mode) => {
    this.setState(
      {
        mode,
      },
      () => {
        this.renderSlides();
      }
    );
    this.logDebugMessage('changeMode mode: ', mode.type);
    try {
      this.editorKit.internal.componentManager.setComponentDataValueForKey(
        ComponentDataKey.Mode,
        mode.type
      );
    } catch (e) {
      if (debugMode) {
        console.log('Error saving mode: ' + e);
      }
    }
  };

  removeSelection = () => {
    let selection = window.getSelection();
    if (selection) {
      selection.removeAllRanges();
    }
  };

  configureResizer = () => {
    const MarpEditor = document.getElementById(HtmlElementId.MarpEditor);
    const editor = document.getElementById(HtmlElementId.Editor);
    const columnResizer = document.getElementById(HtmlElementId.ColumnResizer);
    let pressed = false;
    let safetyOffset = 15;
    let resizerWidth = 0;
    if (columnResizer) {
      resizerWidth = columnResizer.offsetWidth;
    }

    if (editor && columnResizer) {
      columnResizer.addEventListener(MouseEvent.Down, (event) => {
        pressed = true;
        columnResizer.classList.add(HtmlClassName.Dragging);
        editor.classList.add(HtmlClassName.NoSelection);
      });
    }

    document.addEventListener(MouseEvent.Move, (event) => {
      if (!pressed) {
        return;
      }
      let x = event.clientX;
      if (MarpEditor) {
        if (x < resizerWidth / 2 + safetyOffset) {
          x = resizerWidth / 2 + safetyOffset;
        } else if (x > MarpEditor.offsetWidth - resizerWidth - safetyOffset) {
          x = MarpEditor.offsetWidth - resizerWidth - safetyOffset;
        }
      }

      const colLeft = x - resizerWidth / 2;
      if (columnResizer) {
        columnResizer.style.left = colLeft + 'px';
      }
      if (editor) {
        editor.style.width = colLeft - safetyOffset + 'px';
      }

      this.removeSelection();
    });

    document.addEventListener(MouseEvent.Up, (event) => {
      if (pressed) {
        pressed = false;
        if (columnResizer) {
          columnResizer.classList.remove(HtmlClassName.Dragging);
        }
        if (editor) {
          editor.classList.remove(HtmlClassName.NoSelection);
        }
      }
    });
  };

  onBlur = (e: React.FocusEvent) => {
    keyMap.clear();
  };

  onFocus = (e: React.FocusEvent) => {};

  onKeyDown = (e: React.KeyboardEvent | KeyboardEvent) => {
    keyMap.set(e.key, true);
    // Do nothing if 'Control' and 's' are pressed
    if (keyMap.get('Control') && keyMap.get('s')) {
      e.preventDefault();
    }
  };

  onKeyUp = (e: React.KeyboardEvent | KeyboardEvent) => {
    keyMap.delete(e.key);
  };

  logDebugMessage = (message: string, object: any) => {
    if (debugMode) {
      console.log(message, object);
    }
  };

  print = () => {
    this.renderSlides();
    const MarpContent = document.getElementById(HtmlElementId.MarpContent);
    if (MarpContent) {
      MarpContent.style['display'] = 'block';
    }
    setTimeout(() => {
      window.print();
      if (MarpContent) {
        MarpContent.style['display'] = 'none';
      }
    }, 250);
  };

  render() {
    const { text } = this.state;
    return [
      <div
        className={
          HtmlClassName.SnComponent +
          ' ' +
          this.state.platform +
          (this.state.printUrl ? ' print-url' : '')
        }
        id={HtmlElementId.MarpEditor}
        tabIndex={0}
      >
        <div id={HtmlElementId.Header}>
          <div className="segmented-buttons-container sk-segmented-buttons">
            <div className="buttons">
              {modes.map((mode) => (
                <button
                  onClick={() => this.changeMode(mode)}
                  className={
                    'sk-button button ' +
                    (this.state.mode === mode
                      ? 'selected info'
                      : 'sk-secondary-contrast')
                  }
                  title={'Turn on ' + mode.label + ' Mode'}
                >
                  <div className="label">{mode.label}</div>
                </button>
              ))}
            </div>
          </div>
          <a
            href="https://marpeditor.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button
              className={'sk-button button sk-secondary-contrast icon-button'}
              id={HtmlElementId.HelpButton}
              title={'Help'}
            >
              <span>&nbsp;</span>
              <HelpIcon role="button" />
              <span>&nbsp;</span>
            </button>
          </a>
          <button
            className={'sk-button button sk-secondary-contrast icon-button'}
            id={HtmlElementId.PrintButton}
            onClick={() => this.print()}
            title={'Print rendered slides'}
          >
            <span>&nbsp;</span>
            <PrintIcon role="button" />
            <span>&nbsp;</span>
          </button>
        </div>
        <main
          id={HtmlElementId.EditorContainer}
          className={this.state.mode.css}
        >
          <textarea
            autoCapitalize="true"
            autoComplete="true"
            className={this.state.mode.css}
            dir="auto"
            id={HtmlElementId.Editor}
            onBlur={this.onBlur}
            onChange={this.handleInputChange}
            onFocus={this.onFocus}
            onKeyDown={this.onKeyDown}
            onKeyUp={this.onKeyUp}
            placeholder=""
            spellCheck="true"
            value={text}
          />
          <div
            className={this.state.mode.css}
            id={HtmlElementId.ColumnResizer}
          ></div>
          <style id={HtmlElementId.MarpStyles}></style>
          <section
            className={this.state.mode.css}
            id={HtmlElementId.View}
            tabIndex={0}
          ></section>
        </main>
      </div>,
      <div id={HtmlElementId.MarpContent}></div>,
    ];
  }
}
