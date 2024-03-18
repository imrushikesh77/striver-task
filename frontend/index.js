document.addEventListener('DOMContentLoaded', () => {
    const submitCode = document.getElementById('button');

    submitCode.addEventListener('click', (event) => {

        event.preventDefault();
        const username = document.getElementById('username').value;
        const language = document.getElementById('language').value;
        const stdin = document.getElementById('stdin').value;
        const sourceCode = document.getElementById('sourceCode').value;
        const codeFile = document.getElementById('codeFile').files[0];

        const formData = new FormData();
        formData.append('username', username);
        formData.append('language', language);
        formData.append('stdin', stdin);
        formData.append('sourceCode', sourceCode);
        if(codeFile)formData.append('codeFile', codeFile);

        fetch('http://localhost:3000/submit', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Code submitted successfully") {
                    const msg = document.getElementById('msg');
                    msg.innerHTML = data.message;
                }
                else{
                    msg.innerHTML = "Internal Server Error"
                }
            })
            .catch(error => console.error('Error:', error));
        event.preventDefault();
    });
});

