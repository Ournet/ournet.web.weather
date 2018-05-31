"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var ListComponent = /** @class */ (function (_super) {
    __extends(ListComponent, _super);
    function ListComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ListComponent.prototype.render = function () {
        var props = this.props;
        var rows = [];
        for (var i = 0; i < props.count; i++) {
            rows.push(React.createElement("tr", null,
                React.createElement("td", null, i + 1),
                React.createElement("td", null, i + 10)));
        }
        return (React.createElement("table", null,
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", null, "No"),
                    React.createElement("th", null, "Count"))),
            React.createElement("tbody", null, rows)));
    };
    return ListComponent;
}(React.Component));
exports["default"] = ListComponent;
