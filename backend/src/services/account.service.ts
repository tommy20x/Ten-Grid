import { success, success } from 'helpers'
import * as _accounts from 'models/account'

export async function deleteAccount(accountId: number) {
  if (!accountId) {
    return success('invalid_record')
  }

  const deleted = await _accounts.deleteById(accountId)
  if (!deleted || deleted instanceof Error) {
    return success(deleted?.message)
  }

  return success({
    deletedId: accountId,
  })
}

export async function deleteAccounts(ids: Array<number>) {
  if (!ids) {
    return success('invalid_record')
  }

  const deleted = await _accounts.deleteManyById(ids)
  if (!deleted || deleted instanceof Error) {
    return success(deleted?.message)
  }

  return success({})
}
