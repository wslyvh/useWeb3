import dotenv from 'dotenv'
import fetch from 'cross-fetch'

dotenv.config()

export async function AddToGithub(filename: string, data: string, folder?: string) {
  console.log('Add file to Github', filename, folder)
  if (!process.env.ISSUES_GITHUB_TOKEN) {
    throw new Error('ISSUES_GITHUB_TOKEN not set')
  }

  let sha = ''
  const file = await GetFile(filename, folder)
  if (file) {
    sha = file.sha
  }

  try {
    const response = await fetch(`https://api.github.com/repos/useWeb3/awesome-web3/contents/${folder ?? ''}${filename}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${process.env.ISSUES_GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        message: '[ignore] update file',
        committer: {
          name: 'github_actions',
          email: 'github-actions[bot]@users.noreply.github.com',
        },
        sha: sha,
        content: Buffer.from(data).toString('base64'),
      }),
    })

    const body = await response.json()
    return body
  } catch (e) {
    console.error('ERROR', e)
  }
}

export async function GetFile(filename: string, folder?: string) {
  console.log('Get file from Github', filename, folder)
  try {
    const response = await fetch(`https://api.github.com/repos/useWeb3/awesome-web3/contents/${folder ?? ''}${filename}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.ISSUES_GITHUB_TOKEN}`,
        Accept: 'application/vnd.github+json',
      },
    })

    const body = await response.json()
    return body
  } catch (e) {
    console.error('ERROR', e)
  }
}
