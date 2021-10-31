const LoginForm = ({email, password, onSubmit}) => {
    return (
        <form action={onSubmit}>
            <input type="email" value={email} placeholder="email"/>
            <input type = "password" value={password} placeholder="password" />
            <input type="submit"/>
        </form>
    )
}

export const LoginForm;