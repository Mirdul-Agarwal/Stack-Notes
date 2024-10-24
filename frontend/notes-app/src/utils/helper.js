export const validateEmail = (email) =>{
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};
export const getInitials = (name) => {
    if (!name) return "";

    const words = name.trim().split(/\s+/); // Split by whitespace and trim excess spaces
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0].toUpperCase(); // Capitalize the first letter of each word
    }
    return initials;
};
