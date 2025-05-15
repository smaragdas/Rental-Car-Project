// src/lib/decodeJwt.js
export default function decodeJwt(token) {
    try {
        const [, payload] = token.split('.');
        if (!payload) return {};
        // base64url → base64
        const b64 = payload.replace(/-/g, '+').replace(/_/g, '/');
        // atob gives the JSON string, but we need to URI-decode each byte
        const json = decodeURIComponent(
        atob(b64)
            .split('')
            .map(c =>
            '%' + c.charCodeAt(0).toString(16).padStart(2, '0')
            )
            .join('')
        );
        return JSON.parse(json);
    } catch {
        return {};
    }
}