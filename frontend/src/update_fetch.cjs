const fs = require('fs');

const path = 'd:\\CDW-WebBanSach\\Web-b-n-s-ch\\frontend\\src\\App.jsx';
let content = fs.readFileSync(path, 'utf8');

content = content.replace(/await fetch\(([^)]+)\)/g, (match, args) => {
    // Ignore auth endpoints except profile
    if (args.includes('/api/auth/login') || 
        args.includes('/api/auth/google-login') || 
        args.includes('/api/auth/verify-otp') || 
        args.includes('/api/auth/register') ||
        args.includes('/api/auth/refresh')) {
        return match;
    }
    return `await apiFetch(${args})`;
});

fs.writeFileSync(path, content, 'utf8');
console.log('App.jsx updated fetch calls');
