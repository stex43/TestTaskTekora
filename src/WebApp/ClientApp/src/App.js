"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var React = require("react");
var react_1 = require("react");
var Stack_1 = require("@fluentui/react/lib/Stack");
var Icons_1 = require("@fluentui/react/lib/Icons");
var TextField_1 = require("@fluentui/react/lib/TextField");
var react_2 = require("@fluentui/react");
var Label_1 = require("@fluentui/react/lib/Label");
var Button_1 = require("@fluentui/react/lib/Button");
var date_fns_1 = require("date-fns");
var app = function () {
    var loginRegexp = /^[A-Za-z0-9_]{3,15}$/;
    var emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var _a = (0, react_1.useState)(), login = _a[0], setLogin = _a[1];
    var _b = (0, react_1.useState)(), password = _b[0], setPassword = _b[1];
    var _c = (0, react_1.useState)(), passwordRepeat = _c[0], setRepeatPassword = _c[1];
    var _d = (0, react_1.useState)(), name = _d[0], setName = _d[1];
    var _e = (0, react_1.useState)(), email = _e[0], setEmail = _e[1];
    var _f = (0, react_1.useState)(), phone = _f[0], setPhone = _f[1];
    var _g = (0, react_1.useState)(), birthday = _g[0], setBirthday = _g[1];
    (0, Icons_1.initializeIcons)();
    return (React.createElement(Stack_1.Stack, { styles: { "root": { "width": 400 } }, tokens: { "childrenGap": 20 } },
        React.createElement(TextField_1.TextField, { label: "Enter your login", onChange: function (_, value) { return setLogin(value); }, required: true, errorMessage: hasLoginError() ? "Use 3-15 symbols: A-Z, a-z, 0-9, _" : "" }),
        React.createElement(TextField_1.TextField, { label: "Enter your password", onChange: function (_, value) { return setPassword(value); }, type: "password", canRevealPassword: true, required: true, errorMessage: hasPasswordError() ? "Use 6-30 symbols" : "" }),
        React.createElement(TextField_1.TextField, { label: "Repeat your password", onChange: function (_, value) { return setRepeatPassword(value); }, type: "password", canRevealPassword: true, errorMessage: hasRepeatPasswordError() ? "Passwords don't match" : "", required: true }),
        React.createElement(TextField_1.TextField, { label: "Enter your name", onChange: function (_, value) { return setName(value); }, required: true }),
        React.createElement(Stack_1.Stack, null,
            React.createElement(Label_1.Label, { required: true }, "Select your birthday"),
            React.createElement(react_2.Calendar, { showMonthPickerAsOverlay: true, highlightSelectedMonth: true, showGoToToday: false, onSelectDate: function (value) { return setBirthday(value); }, strings: react_2.defaultCalendarStrings }),
            React.createElement(TextField_1.TextField, { readOnly: true, underlined: true, value: birthday !== undefined ? (0, date_fns_1.format)(birthday, "dd.MM.yyyy") : "", errorMessage: birthday === undefined ? "Select your birthday" : "" })),
        React.createElement(TextField_1.TextField, { label: "Enter your email", onChange: function (_, value) { return setEmail(value); }, placeholder: "your@email.here", errorMessage: hasEmailError() ? "Wrong email format" : "", required: true }),
        React.createElement(TextField_1.MaskedTextField, { label: "Enter your phone", onChange: function (_, value) { return setPhone(value); }, mask: "+7 (999) 999-99-99", required: true }),
        React.createElement(Button_1.PrimaryButton, { text: "Register", disabled: !canRegister() })));
    function hasPasswordError() {
        if (password === undefined) {
            return false;
        }
        return password.length !== 0 && (password.length < 6 || password.length > 30);
    }
    function hasRepeatPasswordError() {
        if (passwordRepeat === undefined) {
            return false;
        }
        return passwordRepeat.length !== 0 && password !== passwordRepeat;
    }
    function hasLoginError() {
        if (login === undefined) {
            return false;
        }
        return !loginRegexp.test(login);
    }
    function hasEmailError() {
        if (email === undefined || email.length === 0) {
            return false;
        }
        return !emailRegexp.test(email);
    }
    function hasPhoneUndone() {
        if (phone === undefined) {
            return false;
        }
        return phone.indexOf("_") !== -1;
    }
    function canRegister() {
        return login !== undefined &&
            !hasLoginError() &&
            password !== undefined &&
            !hasPasswordError() &&
            !hasRepeatPasswordError() &&
            name !== undefined &&
            birthday !== undefined &&
            email !== undefined &&
            !hasEmailError() &&
            phone !== undefined &&
            !hasPhoneUndone();
    }
};
exports.app = app;
//# sourceMappingURL=App.js.map