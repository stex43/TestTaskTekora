"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const React = require("react");
const react_1 = require("react");
const Stack_1 = require("@fluentui/react/lib/Stack");
const TextField_1 = require("@fluentui/react/lib/TextField");
const react_2 = require("@fluentui/react");
const Label_1 = require("@fluentui/react/lib/Label");
const Button_1 = require("@fluentui/react/lib/Button");
const react_3 = require("@fluentui/react");
const date_fns_1 = require("date-fns");
const app = () => {
    const formatLoginErrorMessage = "Use 3-15 symbols: A-Z, a-z, 0-9, _";
    const conflictedLoginMessage = "Login is already taken";
    const registrationFailedErrorMessage = "Registration has failed";
    const loginRegexp = /^[A-Za-z0-9_]{3,15}$/;
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [login, setLogin] = react_1.useState();
    const [password, setPassword] = react_1.useState();
    const [passwordRepeat, setRepeatPassword] = react_1.useState();
    const [name, setName] = react_1.useState();
    const [email, setEmail] = react_1.useState();
    const [phone, setPhone] = react_1.useState();
    const [birthday, setBirthday] = react_1.useState();
    const [isSearching, setIsSearching] = react_1.useState(false);
    const [conflictedLogin, setConflictedLogin] = react_1.useState(false);
    const [registrationFailed, setRegistrationFailed] = react_1.useState(false);
    const [registrationDone, setRegistrationDone] = react_1.useState(false);
    react_1.useEffect(() => {
        setConflictedLogin(false);
        setRegistrationFailed(false);
        setRegistrationDone(false);
    }, [login]);
    return (React.createElement(Stack_1.Stack, { styles: { "root": { "width": 400 } }, tokens: { "childrenGap": 20 } },
        React.createElement(TextField_1.TextField, { label: "Enter your login", onChange: (_, value) => setLogin(value), required: true, errorMessage: hasLoginError() ? formatLoginErrorMessage : conflictedLogin ? conflictedLoginMessage : undefined }),
        React.createElement(TextField_1.TextField, { label: "Enter your password", onChange: (_, value) => setPassword(value), type: "password", canRevealPassword: true, required: true, errorMessage: hasPasswordError() ? "Use 6-30 symbols" : "" }),
        React.createElement(TextField_1.TextField, { label: "Repeat your password", onChange: (_, value) => setRepeatPassword(value), type: "password", canRevealPassword: true, errorMessage: hasRepeatPasswordError() ? "Passwords don't match" : "", required: true }),
        React.createElement(TextField_1.TextField, { label: "Enter your name", onChange: (_, value) => setName(value), required: true }),
        React.createElement(Stack_1.Stack, null,
            React.createElement(Label_1.Label, { required: true }, "Select your birthday"),
            React.createElement(react_2.Calendar, { showMonthPickerAsOverlay: true, highlightSelectedMonth: true, showGoToToday: false, onSelectDate: (value) => setBirthday(value), strings: react_2.defaultCalendarStrings, maxDate: new Date(Date.now()) }),
            React.createElement(TextField_1.TextField, { readOnly: true, underlined: true, value: birthday !== undefined ? date_fns_1.format(birthday, "dd.MM.yyyy") : "", errorMessage: birthday === undefined ? "Select your birthday" : "" })),
        React.createElement(TextField_1.TextField, { label: "Enter your email", onChange: (_, value) => setEmail(value), placeholder: "your@email.here", errorMessage: hasEmailError() ? "Wrong email format" : "", required: true }),
        React.createElement(TextField_1.MaskedTextField, { label: "Enter your phone", onChange: (_, value) => setPhone(value), mask: "+7 (999) 999-99-99", required: true }),
        React.createElement(Stack_1.Stack, null,
            React.createElement(Button_1.PrimaryButton, { text: "Register", disabled: !canRegister() || conflictedLogin || isSearching || registrationDone, onClick: () => __awaiter(void 0, void 0, void 0, function* () { return yield createUser(); }) }),
            (conflictedLogin || registrationFailed) &&
                React.createElement(react_3.MessageBar, { delayedRender: false, messageBarType: react_3.MessageBarType.error }, conflictedLogin ? conflictedLoginMessage : registrationFailed ? registrationFailedErrorMessage : undefined),
            registrationDone &&
                React.createElement(react_3.MessageBar, { delayedRender: false, messageBarType: react_3.MessageBarType.success }, "Successful registration"))));
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
    function createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            setIsSearching(true);
            const content = {
                Login: login,
                Password: password,
                Name: name,
                Birthday: birthday,
                Email: email,
                Phone: phone
            };
            const response = yield fetch("api/users", {
                method: "POST",
                body: JSON.stringify(content),
                headers: { "Content-Type": "application/json" }
            });
            setIsSearching(false);
            if (response.ok) {
                setRegistrationDone(true);
                return;
            }
            if (response.status === 409) {
                setConflictedLogin(true);
                return;
            }
            setRegistrationFailed(true);
        });
    }
};
exports.app = app;
//# sourceMappingURL=App.js.map