import { parseEther } from 'ethers/lib/utils.js';
import { useAccount, useContractWrite, useEnsName, usePrepareContractWrite } from 'wagmi'
import { DOX_GOLD_CONTRACT_ADDRESS, DOX_V2_TOKEN_ABI, DOX_V2_TOKEN_ADDRESS } from '../constants';

export function Account() {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const {config} = usePrepareContractWrite({
    chainId:97,
    address:DOX_V2_TOKEN_ADDRESS,
    abi:DOX_V2_TOKEN_ABI,
    functionName:'approve',
    args:[DOX_GOLD_CONTRACT_ADDRESS,parseEther('1000')],
  })
  const {data,reset,write} =  useContractWrite({
    ...config,
    onSuccess(data, variables, context) {
      console.log("Success :",data, variables, context)
    },
    onError(error, variables, context) {
      console.log("Error :",error, variables, context)
    },
  });

  return (
    <div>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
      <button disabled={!reset} onClick={()=>write?.()}>Mint</button>
    </div>
  )
}
