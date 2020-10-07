import axios from 'axios';
import logout from "./logout";
import login from "./login";

test('test logout', () => {
    return login('http://myclass.ssu.ac.kr/login/index.php', { username: '20160380', password: 'karkar55@' })
        .then(cookie => {
            return logout('http://myclass.ssu.ac.kr', cookie)
                .then(() => axios.get('http://myclass.ssu.ac.kr', { headers: { 'Cookie': cookie.toString() } }));
        })
        .then((res) => {
            expect(res.data).toContain('LOGIN');
        });
})