import __vite__cjsImport0_react_jsxDevRuntime from "/node_modules/.vite/deps/react_jsx-dev-runtime.js?v=adf1ee15"; const _jsxDEV = __vite__cjsImport0_react_jsxDevRuntime["jsxDEV"];
import CssBaseline from "/node_modules/.vite/deps/@mui_material_CssBaseline.js?v=adf1ee15";
import GlobalStyles from "/node_modules/.vite/deps/@mui_material_GlobalStyles.js?v=adf1ee15";
import __vite__cjsImport3_reactDom_client from "/node_modules/.vite/deps/react-dom_client.js?v=adf1ee15"; const createRoot = __vite__cjsImport3_reactDom_client["createRoot"];
import App from "/src/App.jsx?t=1748254171664";
import { ThemeProvider } from "/node_modules/.vite/deps/@mui_material_styles.js?v=adf1ee15";
import theme from "/src/theme.js";
import "/src/index.css";
//React router dom
import { BrowserRouter } from "/node_modules/.vite/deps/react-router-dom.js?v=adf1ee15";
//Redux store
import { store } from "/src/redux/stores.js";
import { Provider } from "/node_modules/.vite/deps/react-redux.js?v=adf1ee15";
//Redux persist
import { PersistGate } from "/node_modules/.vite/deps/redux-persist_integration_react.js?v=adf1ee15";
import { persistStore } from "/node_modules/.vite/deps/redux-persist.js?v=adf1ee15";
import LoadingProvider from "/src/context/loading/index.jsx";
const persistor = persistStore(store);
createRoot(document.getElementById('root')).render(/*#__PURE__*/ _jsxDEV(Provider, {
    store: store,
    children: /*#__PURE__*/ _jsxDEV(PersistGate, {
        persistor: persistor,
        children: /*#__PURE__*/ _jsxDEV(LoadingProvider, {
            children: /*#__PURE__*/ _jsxDEV(BrowserRouter, {
                basename: "/",
                children: /*#__PURE__*/ _jsxDEV(ThemeProvider, {
                    theme: theme,
                    children: [
                        /*#__PURE__*/ _jsxDEV(GlobalStyles, {
                            styles: {
                                a: {
                                    textDecoration: 'none',
                                    color: 'inherit'
                                }
                            }
                        }, void 0, false, {
                            fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
                            lineNumber: 30,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ _jsxDEV(CssBaseline, {}, void 0, false, {
                            fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
                            lineNumber: 31,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ _jsxDEV(App, {}, void 0, false, {
                            fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
                            lineNumber: 32,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
                    lineNumber: 29,
                    columnNumber: 13
                }, this)
            }, void 0, false, {
                fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
                lineNumber: 27,
                columnNumber: 9
            }, this)
        }, void 0, false, {
            fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
            lineNumber: 25,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
        lineNumber: 24,
        columnNumber: 5
    }, this)
}, void 0, false, {
    fileName: "E:/Khóa Luận Tốt Nghiệp/Ecommerce-Integration-Search-AI-With-CNN/src/main.jsx",
    lineNumber: 23,
    columnNumber: 3
}, this));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDc3NCYXNlbGluZSBmcm9tICdAbXVpL21hdGVyaWFsL0Nzc0Jhc2VsaW5lJ1xyXG5pbXBvcnQgR2xvYmFsU3R5bGVzIGZyb20gJ0BtdWkvbWF0ZXJpYWwvR2xvYmFsU3R5bGVzJ1xyXG5pbXBvcnQgeyBjcmVhdGVSb290IH0gZnJvbSAncmVhY3QtZG9tL2NsaWVudCdcclxuaW1wb3J0IEFwcCBmcm9tICcuL0FwcC5qc3gnXHJcbmltcG9ydCB7IFRoZW1lUHJvdmlkZXIgfSBmcm9tICdAbXVpL21hdGVyaWFsL3N0eWxlcydcclxuaW1wb3J0IHRoZW1lIGZyb20gJy4vdGhlbWUnXHJcbmltcG9ydCAnLi9pbmRleC5jc3MnXHJcblxyXG4vL1JlYWN0IHJvdXRlciBkb21cclxuaW1wb3J0IHsgQnJvd3NlclJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nXHJcblxyXG4vL1JlZHV4IHN0b3JlXHJcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnfi9yZWR1eC9zdG9yZXMuanMnXHJcbmltcG9ydCB7IFByb3ZpZGVyIH0gZnJvbSAncmVhY3QtcmVkdXgnXHJcblxyXG4vL1JlZHV4IHBlcnNpc3RcclxuaW1wb3J0IHsgUGVyc2lzdEdhdGUgfSBmcm9tICdyZWR1eC1wZXJzaXN0L2ludGVncmF0aW9uL3JlYWN0J1xyXG5pbXBvcnQgeyBwZXJzaXN0U3RvcmUgfSBmcm9tICdyZWR1eC1wZXJzaXN0J1xyXG5pbXBvcnQgTG9hZGluZ1Byb3ZpZGVyIGZyb20gJy4vY29udGV4dC9sb2FkaW5nJ1xyXG5jb25zdCBwZXJzaXN0b3IgPSBwZXJzaXN0U3RvcmUoc3RvcmUpXHJcblxyXG5jcmVhdGVSb290KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyb290JykpLnJlbmRlcihcclxuICA8UHJvdmlkZXIgc3RvcmU9e3N0b3JlfT5cclxuICAgIDxQZXJzaXN0R2F0ZSBwZXJzaXN0b3I9e3BlcnNpc3Rvcn0+XHJcbiAgICAgIDxMb2FkaW5nUHJvdmlkZXI+XHJcblxyXG4gICAgICAgIDxCcm93c2VyUm91dGVyIGJhc2VuYW1lPScvJz5cclxuXHJcbiAgICAgICAgICAgIDxUaGVtZVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgICAgICAgICAgPEdsb2JhbFN0eWxlcyBzdHlsZXM9e3sgYTogeyB0ZXh0RGVjb3JhdGlvbjogJ25vbmUnLCBjb2xvcjogJ2luaGVyaXQnIH0gfX0gLz5cclxuICAgICAgICAgICAgICA8Q3NzQmFzZWxpbmUgLz5cclxuICAgICAgICAgICAgICA8QXBwIC8+XHJcbiAgICAgICAgICAgIDwvVGhlbWVQcm92aWRlcj5cclxuICAgICAgICA8L0Jyb3dzZXJSb3V0ZXI+XHJcblxyXG4gICAgICA8L0xvYWRpbmdQcm92aWRlcj5cclxuICAgIDwvUGVyc2lzdEdhdGU+XHJcbiAgPC9Qcm92aWRlcj5cclxuKVxyXG5cclxuIl0sIm5hbWVzIjpbIkNzc0Jhc2VsaW5lIiwiR2xvYmFsU3R5bGVzIiwiY3JlYXRlUm9vdCIsIkFwcCIsIlRoZW1lUHJvdmlkZXIiLCJ0aGVtZSIsIkJyb3dzZXJSb3V0ZXIiLCJzdG9yZSIsIlByb3ZpZGVyIiwiUGVyc2lzdEdhdGUiLCJwZXJzaXN0U3RvcmUiLCJMb2FkaW5nUHJvdmlkZXIiLCJwZXJzaXN0b3IiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwicmVuZGVyIiwiYmFzZW5hbWUiLCJzdHlsZXMiLCJhIiwidGV4dERlY29yYXRpb24iLCJjb2xvciJdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU9BLGlCQUFpQiw0QkFBMkI7QUFDbkQsT0FBT0Msa0JBQWtCLDZCQUE0QjtBQUNyRCxTQUFTQyxVQUFVLFFBQVEsbUJBQWtCO0FBQzdDLE9BQU9DLFNBQVMsWUFBVztBQUMzQixTQUFTQyxhQUFhLFFBQVEsdUJBQXNCO0FBQ3BELE9BQU9DLFdBQVcsVUFBUztBQUMzQixPQUFPLGNBQWE7QUFFcEIsa0JBQWtCO0FBQ2xCLFNBQVNDLGFBQWEsUUFBUSxtQkFBa0I7QUFFaEQsYUFBYTtBQUNiLFNBQVNDLEtBQUssUUFBUSxvQkFBbUI7QUFDekMsU0FBU0MsUUFBUSxRQUFRLGNBQWE7QUFFdEMsZUFBZTtBQUNmLFNBQVNDLFdBQVcsUUFBUSxrQ0FBaUM7QUFDN0QsU0FBU0MsWUFBWSxRQUFRLGdCQUFlO0FBQzVDLE9BQU9DLHFCQUFxQixvQkFBbUI7QUFDL0MsTUFBTUMsWUFBWUYsYUFBYUg7QUFFL0JMLFdBQVdXLFNBQVNDLGNBQWMsQ0FBQyxTQUFTQyxNQUFNLGVBQ2hELFFBQUNQO0lBQVNELE9BQU9BO2NBQ2YsY0FBQSxRQUFDRTtRQUFZRyxXQUFXQTtrQkFDdEIsY0FBQSxRQUFDRDtzQkFFQyxjQUFBLFFBQUNMO2dCQUFjVSxVQUFTOzBCQUVwQixjQUFBLFFBQUNaO29CQUFjQyxPQUFPQTs7c0NBQ3BCLFFBQUNKOzRCQUFhZ0IsUUFBUTtnQ0FBRUMsR0FBRztvQ0FBRUMsZ0JBQWdCO29DQUFRQyxPQUFPO2dDQUFVOzRCQUFFOzs7Ozs7c0NBQ3hFLFFBQUNwQjs7Ozs7c0NBQ0QsUUFBQ0cifQ==