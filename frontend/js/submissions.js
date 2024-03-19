fetch('http://localhost:3000/submissions')
    .then(response => response.json())
    .then(data => {
        const submissions = document.getElementById('submission-table');
        data.forEach(result => {
            const row = document.createElement('tr');

            // Adding timestamp
            const timestampCell = document.createElement('td');
            timestampCell.textContent = result.timestamp;
            row.appendChild(timestampCell);

            // Adding username
            const usernameCell = document.createElement('td');
            usernameCell.textContent = result.username;
            row.appendChild(usernameCell);

            // Adding language
            const languageCell = document.createElement('td');
            languageCell.textContent = result.language;
            row.appendChild(languageCell);

            // Adding standard input
            const stdinCell = document.createElement('td');
            const stdinPre = document.createElement('pre');
            stdinPre.textContent = result.stdin;
            stdinCell.appendChild(stdinPre);
            row.appendChild(stdinCell);

            // Adding source code (only first 100 characters)
            const sourceCodeCell = document.createElement('td');
            const sourceCodePre = document.createElement('pre');
            sourceCodePre.textContent = result.sourceCode.substring(0, 100);
            sourceCodeCell.appendChild(sourceCodePre);
            row.appendChild(sourceCodeCell);

            // Adding output
            const outputCell = document.createElement('td');
            outputCell.textContent = result.output;
            row.appendChild(outputCell);

            // Appending the row to the table
            submissions.appendChild(row);

        }
    )
})
