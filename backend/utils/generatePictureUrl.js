import crypto from 'crypto';
 
function getProfilePictureUrl(username, size = 80) {
    const trimmedUsername = username.trim().toLowerCase();
    const hash = crypto.createHash('sha256').update(trimmedUsername).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=robohash`;
}

export default getProfilePictureUrl;
 
// Example usage
// const username = 'ngenemich';
// const size = 80; // Optional size parameter
// const profilePictureUrl = getProfilePictureUrl(username, size);

// console.log(`Gravatar URL (${username}):`, profilePictureUrl);