class StringHelpers {
    static generateBookingCode() {
        const pool = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const length = 6;
        let code = '';

        for (let i = 0; i < length; i++) {
            code += pool[Math.floor(Math.random() * pool.length)];
        }

        return code
    }
}

module.exports = StringHelpers;