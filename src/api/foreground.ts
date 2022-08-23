import { Module, ModuleFunction } from "./module";

// import modules
import permissionsModule from "./modules/permissions";
import permissions from "./modules/permissions/permissions.foreground";
import activeAddressModule from "./modules/active_address";
import activeAddress from "./modules/active_address/active_address.foreground";
import allAddressesModule from "./modules/all_addresses";
import allAddresses from "./modules/all_addresses/all_addresses.foreground";
import publicKeyModule from "./modules/public_key";
import publicKey from "./modules/public_key/public_key.foreground";
import walletNamesModule from "./modules/wallet_names";
import walletNames from "./modules/wallet_names/wallet_names.foreground";
import arweaveConfigModule from "./modules/arweave_config";
import arweaveConfig from "./modules/arweave_config/arweave_config.foreground";
import disconnectModule from "./modules/disconnect";
import disconnect from "./modules/disconnect/disconnect.foreground";
import connectModule from "./modules/connect";
import connect, {
  finalizer as connectFinalizer
} from "./modules/connect/connect.foreground";
import signModule from "./modules/sign";
import sign, {
  finalizer as signFinalizer
} from "./modules/sign/sign.foreground";

/** Foreground modules */
const modules: ForegroundModule[] = [
  { ...permissionsModule, function: permissions },
  { ...activeAddressModule, function: activeAddress },
  { ...allAddressesModule, function: allAddresses },
  { ...publicKeyModule, function: publicKey },
  { ...walletNamesModule, function: walletNames },
  { ...arweaveConfigModule, function: arweaveConfig },
  { ...disconnectModule, function: disconnect },
  { ...connectModule, function: connect, finalizer: connectFinalizer },
  { ...signModule, function: sign, finalizer: signFinalizer }
];

export default modules;

/** Extended module interface */
interface ForegroundModule extends Module<any[] | void> {
  /**
   * A function that runs after results were
   * returned from the background script.
   * This is optional and will be ignored if not set.
   */
  finalizer?: ModuleFunction<any> | TransformFinalizer<any, any, any>;
}

/**
 * @param result The result from the background script
 * @param params The params the background script received
 * @param originalParams The params the injected function was called with
 */
export type TransformFinalizer<ResultType, ParamsType, OriginalParamsType> = (
  result: ResultType,
  params: ParamsType,
  originalParams: OriginalParamsType
) => any;
