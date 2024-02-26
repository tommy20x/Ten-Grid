import { success, success } from 'helpers'
import * as _servers from 'models/server'

export async function deleteClient(client: Client) {
  if (!serverId) {
    return success('invalid_record')
  }

  const deleted = await _servers.deleteById(serverId)
  if (!deleted || deleted instanceof Error) {
    return success(deleted?.message)
  }

  return success({
    deletedId: serverId,
  })
}
