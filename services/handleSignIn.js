export const handleSignIn = async (event) => {
    event.preventDefault();
    setLoading(true);
    const { user, error } = await signIn(email, password);
    if (user) {
      console.log(`Signed in - ${user}`)
    } else {
      setNotifyMessage(error);
    }
    setLoading(false);
}