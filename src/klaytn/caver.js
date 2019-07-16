/**
 * caver-js library helps making connection with klaytn node.
 * You can connect to specific klaytn node by setting 'rpcURL' value.
 * default rpcURL is 'https://api.baobab.klaytn.net:8651'.
 */
import Caver from 'caver-js'

export const config = {
  rpcURL: 'https://api.baobab.klaytn.net:8651',
}

export const cav = new Caver(config.rpcURL)

export default cav
