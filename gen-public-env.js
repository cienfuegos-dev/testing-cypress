const fs = require('fs');
const path = require('path');

// Current implementation only supports replacing string field that are surrounded by double quotes.

const payloadRegex = /EOF\s*(?<payload>[\s\S]+)\s*EOF/;
const envVarsRegex = /"\${(?<envar>[a-zA-Z_0-9]+)\??\}"/g;
const dynamicEnvVarRegex = (name) => new RegExp(`"\\\${(${name})\\??\\}"`, 'gi');

const getReplacedEnvInject = () => {
    const envInjectTemplatePath = path.join(__dirname, 'deploy', 'public-env.js.sh');
    const envInjectTemplate = fs.readFileSync(envInjectTemplatePath).toString().match(payloadRegex)?.groups?.payload || '';
    const envVarMatches = envInjectTemplate.matchAll(envVarsRegex);

    let envInjectReplaced = envInjectTemplate;

    [...envVarMatches]
        .map((_) => _.groups?.envar)
        .forEach((name) => {
            if (!process.env[name]) {
                console.error('Environment variable', name, 'is not defined');
            }
            envInjectReplaced = envInjectReplaced.replaceAll(dynamicEnvVarRegex(name), `"${process.env[name] || ''}"`);
        });

    return envInjectReplaced;
};

(async () => {
    const envInjectReplacedPath = path.join(__dirname, 'public', 'public-env', 'public-env.js');
    fs.writeFileSync(envInjectReplacedPath, getReplacedEnvInject());
})();
