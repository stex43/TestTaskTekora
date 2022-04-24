import * as React from "react";
import { useState, useEffect } from "react";
import { Stack } from "@fluentui/react/lib/Stack";
import { TextField, MaskedTextField } from "@fluentui/react/lib/TextField";
import { Calendar, defaultCalendarStrings } from "@fluentui/react";
import { Label } from "@fluentui/react/lib/Label";
import { PrimaryButton } from "@fluentui/react/lib/Button";
import { MessageBar, MessageBarType } from "@fluentui/react";
import { format } from "date-fns"

export const app: React.FC = () => {
    const formatLoginErrorMessage = "Use 3-15 symbols: A-Z, a-z, 0-9, _";
    const conflictedLoginMessage = "Login is already taken";
    const registrationFailedErrorMessage = "Registration has failed";

    const loginRegexp = /^[A-Za-z0-9_]{3,15}$/;
    const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [login, setLogin] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [passwordRepeat, setRepeatPassword] = useState<string>();
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [birthday, setBirthday] = useState<Date>();

    const [isSearching, setIsSearching] = useState<boolean>(false);
    const [conflictedLogin, setConflictedLogin] = useState<boolean>(false);
    const [registrationFailed, setRegistrationFailed] = useState<boolean>(false);

    const [registrationDone, setRegistrationDone] = useState<boolean>(false);

    useEffect(() => {
            setConflictedLogin(false);
            setRegistrationFailed(false);
            setRegistrationDone(false);
        },
        [login]);
    
    return (
        <Stack styles={{ "root": { "width": 400 } }} tokens={{ "childrenGap": 20 }} >
            <TextField
                label="Enter your login"
                onChange={(_, value) => setLogin(value)}
                required
                errorMessage={hasLoginError() ? formatLoginErrorMessage : conflictedLogin ? conflictedLoginMessage : undefined}
            />

            <TextField
                label="Enter your password"
                onChange={(_, value) => setPassword(value)}
                type="password"
                canRevealPassword
                required
                errorMessage={hasPasswordError() ? "Use 6-30 symbols" : ""}
            />

            <TextField
                label="Repeat your password"
                onChange={(_, value) => setRepeatPassword(value)}
                type="password"
                canRevealPassword
                errorMessage={hasRepeatPasswordError() ? "Passwords don't match" : ""}
                required />

            <TextField
                label="Enter your name"
                onChange={(_, value) => setName(value)}
                required />

            <Stack>
                <Label required>
                    Select your birthday
                </ Label>

                <Calendar
                    showMonthPickerAsOverlay
                    highlightSelectedMonth
                    showGoToToday={false}
                    onSelectDate={(value) => setBirthday(value)}
                    strings={defaultCalendarStrings}
                    maxDate={new Date(Date.now())}
                />

                <TextField
                    readOnly
                    underlined
                    value={birthday !== undefined ? format(birthday, "dd.MM.yyyy") : ""}
                    errorMessage={birthday === undefined ? "Select your birthday" : ""} />
            </Stack>

            <TextField
                label="Enter your email"
                onChange={(_, value) => setEmail(value)}
                placeholder={"your@email.here"}
                errorMessage={hasEmailError() ? "Wrong email format" : ""}
                required />

            <MaskedTextField
                label="Enter your phone"
                onChange={(_, value) => setPhone(value)}
                mask="+7 (999) 999-99-99"
                required />

            <Stack>
                <PrimaryButton
                    text={"Register"}
                    disabled={!canRegister() || conflictedLogin || isSearching || registrationDone}
                    onClick={async () => await createUser()}
                />

                {(conflictedLogin || registrationFailed) &&
                    <MessageBar
                        delayedRender={false}
                        messageBarType={MessageBarType.error}>
                        {conflictedLogin ? conflictedLoginMessage : registrationFailed ? registrationFailedErrorMessage : undefined}
                    </MessageBar>}

                {registrationDone &&
                    <MessageBar
                        delayedRender={false}
                        messageBarType={MessageBarType.success}>
                        Successful registration
                    </MessageBar>}
            </Stack>
        </Stack>
    );

    function hasPasswordError(): boolean {
        if (password === undefined) {
            return false;
        }

        return password.length !== 0 && (password.length < 6 || password.length > 30);
    }

    function hasRepeatPasswordError(): boolean {
        if (passwordRepeat === undefined) {
            return false;
        }

        return passwordRepeat.length !== 0 && password !== passwordRepeat;
    }

    function hasLoginError(): boolean {
        if (login === undefined) {
            return false;
        }

        return !loginRegexp.test(login);
    }

    function hasEmailError(): boolean {
        if (email === undefined || email.length === 0) {
            return false;
        }

        return !emailRegexp.test(email);
    }

    function hasPhoneUndone(): boolean {
        if (phone === undefined) {
            return false;
        }

        return phone.indexOf("_") !== -1;
    }

    function canRegister(): boolean {
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

    async function createUser() {
        setIsSearching(true);

        const content = {
            Login: login,
            Password: password,
            Name: name,
            Birthday: birthday,
            Email: email,
            Phone: phone
        };

        const response = await fetch("api/users",
            {
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
    }
}
