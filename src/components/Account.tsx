import { parseEther } from 'ethers/lib/utils.js';
import Swal from 'sweetalert2';
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
  const {data,isError,isLoading,isSuccess,reset,write} =  useContractWrite({
    ...config,
    onSuccess(data, variables, context) {
      Swal.fire({
        icon:'success',
        text:"Successfully Approved!",
        toast:true,
        position:'center',
        timerProgressBar:true,
        timer:3000
      })
    },
    onError(error, variables, context) {
      Swal.fire({
        icon:'error',
        text:"Failed to Approved!",
        toast:true,
        position:'center',
        timerProgressBar:true,
        timer:3000
      })
    },
  });

  return (
    <div>
      {ensName ?? address}
      {ensName ? ` (${address})` : null}
      {<button disabled={!reset} onClick={()=>write?.()}>Approve</button>}
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Successfully Approved</p>}
      {isError && <p>Could not proceed the Approval transaction</p>}
    </div>
  )
}
