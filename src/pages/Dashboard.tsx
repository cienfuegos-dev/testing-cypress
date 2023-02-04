import { FormEventHandler, useState } from "react";

export function Dashboard() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [welcomeText, setWelcomeText] = useState("");

    const onSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        setWelcomeText(`Hi there, ${username}!`);
    };
    return (
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard.</p>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="Username" data-username value={username} onChange={e => setUsername(e.target.value)} />
                <input type="password" placeholder="Password" data-password value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Submit</button>
            </form>
            <p>
                {welcomeText}
            </p>
        </div>
    );
}
