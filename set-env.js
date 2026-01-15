const fs = require('fs');
const targetPath = './src/environments/environment.ts';
// On génère le contenu du fichier en utilisant la variable de Vercel
const envConfigFile = `
export const environment = {
production: true,
googleScriptURL: '${process.env.GOOGLE_SCRIPT_URL}'
};
`;
// Création du dossier si absent et écriture du fichier
if (!fs.existsSync('./src/environments')) {
fs.mkdirSync('./src/environments', { recursive: true });
}
fs.writeFileSync(targetPath, envConfigFile);
console.log(' environment.ts généré dynamiquement.');