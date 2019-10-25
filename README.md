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

### `phonito-token`

**Required** Your api token for Phonito Security. Get it here: https://phonito.io/setup-ci

## Example usage

```yaml
uses: phonito/phonito-scanner-action@master
with:
  image: 'myapp:build-42'
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpX....'
```
