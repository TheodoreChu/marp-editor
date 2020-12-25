(this["webpackJsonpmarp-editor"]=this["webpackJsonpmarp-editor"]||[]).push([[0],{205:function(e,t,n){},278:function(e,t){},279:function(e,t){},280:function(e,t){},299:function(e,t){},565:function(e,t){},796:function(e,t,n){},797:function(e,t,n){"use strict";n.r(t);var o,i,r,s,a=n(7),c=n(26),d=n.n(c),l=n(193),u=n.n(l),m=(n(205),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,798)).then((function(t){var n=t.getCLS,o=t.getFID,i=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),o(e),i(e),r(e),s(e)}))}),p=n(198),f=n(194),v=n(195),g=n(199),h=n(197),b=n(93),y=n(92),j=n.n(y),M=n(196),x=function(e){var t=e.fill,n=e.role;return Object(a.jsx)("svg",{"aria-label":"print icon",role:n,width:"20",height:"20",viewBox:"0 0 20 20",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:Object(a.jsx)("path",{d:"M15.0001 2.5H5.00008V5.83333H15.0001V2.5ZM15.8334 10C15.6124 10 15.4004 9.9122 15.2442 9.75592C15.0879 9.59964 15.0001 9.38768 15.0001 9.16667C15.0001 8.94565 15.0879 8.73369 15.2442 8.57741C15.4004 8.42113 15.6124 8.33333 15.8334 8.33333C16.0544 8.33333 16.2664 8.42113 16.4227 8.57741C16.579 8.73369 16.6668 8.94565 16.6668 9.16667C16.6668 9.38768 16.579 9.59964 16.4227 9.75592C16.2664 9.9122 16.0544 10 15.8334 10ZM13.3334 15.8333H6.66675V11.6667H13.3334V15.8333ZM15.8334 6.66667H4.16675C3.50371 6.66667 2.86782 6.93006 2.39898 7.3989C1.93014 7.86774 1.66675 8.50363 1.66675 9.16667V14.1667H5.00008V17.5H15.0001V14.1667H18.3334V9.16667C18.3334 8.50363 18.07 7.86774 17.6012 7.3989C17.1323 6.93006 16.4965 6.66667 15.8334 6.66667Z",fill:t||"var(--sn-stylekit-foreground-color)"})})};n(794),n(795),n(192);!function(e){e.Mode="mode"}(o||(o={})),function(e){e.ColumnResizer="column-resizer",e.Editor="editor",e.EditorContainer="editor-container",e.Header="header",e.MarpContent="marp-content",e.MarpEditor="marp-editor",e.MarpStyles="marp-styles",e.View="view",e.PrintButton="print-button"}(i||(i={})),function(e){e.Dragging="dragging",e.NoSelection="no-selection",e.SnComponent="sn-component",e.Textarea="sk-input textarea"}(r||(r={})),function(e){e[e.Edit=0]="Edit",e[e.Split=1]="Split",e[e.View=2]="View"}(s||(s={}));var C,w=[{type:s.Edit,label:"Edit",css:"edit"},{type:s.Split,label:"Split",css:"split"},{type:s.View,label:"View",css:"view"}];!function(e){e.Down="mousedown",e.Move="mousemove",e.Up="mouseup"}(C||(C={}));var S=!1,E={mode:w[1],printUrl:!1,text:""},O=new Map,k=function(e){Object(g.a)(n,e);var t=Object(h.a)(n);function n(e){var s;return Object(f.a)(this,n),(s=t.call(this,e)).editorKit=void 0,s.saveTimer=void 0,s.marp=new j.a({html:!0,emoji:{shortcode:!0,unicode:!1,twemoji:{base:"/resources/twemoji/"}},math:{lib:"katex",katexFontPath:"katex/v0.12.0/fonts/"},minifyCSS:!1,script:!0,markdown:{breaks:!1}}),s.componentDidMount=function(){s.configureEditorKit(),s.configureResizer()},s.configureEditorKit=function(){var e=new b.EditorKitDelegate({setEditorRawText:function(e){s.setState({text:e},(function(){s.renderSlides(),s.loadSavedMode()}))},clearUndoHistory:function(){},getElementsBySelector:function(){return[]}});s.editorKit=new b.EditorKit({delegate:e,mode:"plaintext",supportsFilesafe:!1})},s.saveNote=function(e){try{s.editorKit.onEditorValueChanged(e)}catch(t){console.log("Error saving note:",t)}},s.handleInputChange=function(e){var t=e.target.value;s.saveText(t)},s.saveText=function(e){s.saveNote(e),s.setState({text:e},(function(){s.state.mode!==w[0]&&(s.saveTimer&&clearTimeout(s.saveTimer),Object(M.debounce)((function(){s.renderSlides()}),300),s.saveTimer=setTimeout((function(){s.renderSlides()}),350))}))},s.renderSlides=function(){var e=s.marp.render(s.state.text),t=e.html,n=e.css,o=document.getElementById(i.View);if(o){var r=o.scrollTop;o.innerHTML=t,o.scrollTop=r}var a=document.getElementById(i.MarpStyles);a&&(a.innerHTML=n);var c=document.getElementById(i.MarpContent);c&&(c.innerHTML=t)},s.loadSavedMode=function(){try{var e=s.editorKit.internal.componentManager.componentDataValueForKey(o.Mode);S,"number"===typeof e&&s.setModeFromModeType(e),s.setState({platform:s.editorKit.internal.componentManager.platform},(function(){S}))}catch(t){S}},s.setModeFromModeType=function(e){var t,n=Object(p.a)(w);try{for(n.s();!(t=n.n()).done;){var o=t.value;if(o.type===e)return s.logDebugMessage("setModeFromModeType mode: ",o.type),void s.setState({mode:o},(function(){s.renderSlides()}))}}catch(i){n.e(i)}finally{n.f()}},s.changeMode=function(e){s.setState({mode:e},(function(){s.renderSlides()})),s.logDebugMessage("changeMode mode: ",e.type);try{s.editorKit.internal.componentManager.setComponentDataValueForKey(o.Mode,e.type)}catch(t){S}},s.removeSelection=function(){var e=window.getSelection();e&&e.removeAllRanges()},s.configureResizer=function(){var e=document.getElementById(i.MarpEditor),t=document.getElementById(i.Editor),n=document.getElementById(i.ColumnResizer),o=!1,a=0;n&&(a=n.offsetWidth),t&&n&&n.addEventListener(C.Down,(function(e){o=!0,n.classList.add(r.Dragging),t.classList.add(r.NoSelection)})),document.addEventListener(C.Move,(function(i){if(o){var r=i.clientX;e&&(r<a/2+15?r=a/2+15:r>e.offsetWidth-a-15&&(r=e.offsetWidth-a-15));var c=r-a/2;n&&(n.style.left=c+"px"),t&&(t.style.width=c-15+"px"),s.removeSelection()}})),document.addEventListener(C.Up,(function(e){o&&(o=!1,n&&n.classList.remove(r.Dragging),t&&t.classList.remove(r.NoSelection))}))},s.onBlur=function(e){O.clear()},s.onFocus=function(e){},s.onKeyDown=function(e){O.set(e.key,!0),O.get("Control")&&O.get("s")&&e.preventDefault()},s.onKeyUp=function(e){O.delete(e.key)},s.logDebugMessage=function(e,t){S},s.print=function(){var e=document.getElementById(i.MarpContent);e&&(e.style.display="block"),setTimeout((function(){window.print(),e&&(e.style.display="none")}),250)},s.state=E,s}return Object(v.a)(n,[{key:"render",value:function(){var e=this,t=this.state.text;return[Object(a.jsxs)("div",{className:r.SnComponent+" "+this.state.platform+(this.state.printUrl?" print-url":""),id:i.MarpEditor,tabIndex:0,children:[Object(a.jsxs)("div",{id:i.Header,children:[Object(a.jsx)("div",{className:"segmented-buttons-container sk-segmented-buttons",children:Object(a.jsx)("div",{className:"buttons",children:w.map((function(t){return Object(a.jsx)("button",{onClick:function(){return e.changeMode(t)},className:"sk-button button "+(e.state.mode===t?"selected info":"sk-secondary-contrast"),children:Object(a.jsx)("div",{className:"label",children:t.label})})}))})}),Object(a.jsxs)("button",{className:"sk-button button sk-secondary-contrast icon-button",id:i.PrintButton,onClick:function(){return e.print()},children:[Object(a.jsx)("span",{children:"\xa0"}),Object(a.jsx)(x,{role:"button"}),Object(a.jsx)("span",{children:"\xa0"})]})]}),Object(a.jsxs)("main",{id:i.EditorContainer,className:this.state.mode.css,children:[Object(a.jsx)("textarea",{autoCapitalize:"true",autoComplete:"true",className:this.state.mode.css,dir:"auto",id:i.Editor,onBlur:this.onBlur,onChange:this.handleInputChange,onFocus:this.onFocus,onKeyDown:this.onKeyDown,onKeyUp:this.onKeyUp,placeholder:"",spellCheck:"true",value:t}),Object(a.jsx)("div",{className:this.state.mode.css,id:i.ColumnResizer}),Object(a.jsx)("style",{id:i.MarpStyles}),Object(a.jsx)("section",{className:this.state.mode.css,id:i.View,tabIndex:0})]})]}),Object(a.jsx)("div",{id:i.MarpContent})]}}]),n}(d.a.Component);n(796);u.a.render(Object(a.jsx)(d.a.StrictMode,{children:Object(a.jsx)(k,{})}),document.getElementById("root")),m()}},[[797,1,2]]]);
//# sourceMappingURL=main.98ad00dc.chunk.js.map