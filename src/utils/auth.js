export function logIn(){
	localStorage.setItem("loggedIn", true);
}
export function logOut(){
	localStorage.setItem("loggedIn", false);
}
export function isLoggedIn(){
	return localStorage.getItem("loggedIn") || false
}