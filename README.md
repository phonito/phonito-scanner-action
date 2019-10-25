# Phonito Security Docker Vulnerability Scanner

This action automates scanning Docker images for OS & library vulnerabilities. You will need a Phonito Secuirty account which you can get for free at https://phonito.io.

Example output:

```bash
Phonito Scan Complete!
==============================================
4 CVEs present image.
==============================================
┌────────────────┬───────────┬──────────┬───────────────────┐
│ CVE ID         │ Product   │ Severity │ Installed Version │
├────────────────┼───────────┼──────────┼───────────────────┤
│ CVE-2016-3189  │ bzip2     │ MEDIUM   │ 1.0.6             │
├────────────────┼───────────┼──────────┼───────────────────┤
│ CVE-2017-18018 │ coreutils │ MEDIUM   │ 8.28              │
├────────────────┼───────────┼──────────┼───────────────────┤
│ CVE-2016-2781  │ coreutils │ MEDIUM   │ 8.28              │
├────────────────┼───────────┼──────────┼───────────────────┤
│ CVE-2005-0758  │ gzip      │ MEDIUM   │ 1.6               │
└────────────────┴───────────┴──────────┴───────────────────┘
```

## Inputs

### `image`

**Required** The docker image you want to scan for example: "app:latest" or "nodejs:latest"

### `fail-level`

**Required** The minimum severity of a vulnerability that will fail the build.
e.g. `LOW` to fail all builds containing any vulnerability or `CRITICAL` to only fail on severe vulnerabilities but not `MEDIUM` ones.
options: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`

### `phonito-token`

**Required** Your api token for Phonito Security. Get it here: https://phonito.io/setup-ci

## Example usage

```yaml
name: Build & Scan Docker Image

on: [push]

jobs:

  build:

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1

      - name: Set tag var
        id: vars
        run: echo ::set-output name=docker_tag::$(echo ${GITHUB_REF} | cut -d'/' -f3)-${GITHUB_SHA}

      - name: Build the Docker image
        run: docker build . --file Dockerfile --tag myapp:${{ steps.vars.outputs.docker_tag }}

      - name: Scan with Phonito Security
        uses: phonito/phonito-scanner-action@master
        with:
          image: myapp:${{ steps.vars.outputs.docker_tag }}
          phonito-token: 'eyJhbGciOiJIUz......'

```
