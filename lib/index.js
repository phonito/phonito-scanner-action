const exec = require('@actions/exec');
const core = require('@actions/core');
const os = require('os');

class PhonitoScanRunner {
    run = async () => {
        if (process.platform !== "linux") {
            throw new Error("Only Linux is supported by the Phonito Security scanner.")
        }

        try {
            await this.installPhonitoScanner()
        } catch (e) {
            core.debug(e);
            throw new Error("Error installing the Phonito Security scanner.")
        }

        try {
            await this.scan()
        } catch (e) {
            core.debug(e);
            throw new Error("Docker image contains vulnerabilities")
        }
    }

    installPhonitoScanner = async () => {
        await exec.exec('wget https://phonito-public-artifacts.azureedge.net/scanner/phonito-scanner -O /usr/local/bin/phonito-scanner --quiet');
        await exec.exec('chmod +x /usr/local/bin/phonito-scanner');
    }

    scan = async () => {
        process.env.PHONITO_API_TOKEN = core.getInput('phonito-token')
        await exec.exec('phonito-scanner', ['-i', core.getInput('image')]);
    }
}

new PhonitoScanRunner().run().then(() => {
    console.log('[PHONITO] Succesfully scanned image.');
}).catch((e) => {
    core.setFailed(e.message);
});