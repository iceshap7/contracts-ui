import { Handle, Position } from 'react-flow-renderer';
import { AccountSelectSimple } from 'ui/components/account/SelectSimple';
import { useAccountId } from 'ui/hooks';

const DepositNote = () => {
  const { value: fromAccountId, onChange: setFromAccountId } = useAccountId();
  const { value: toAccountId, onChange: setToAccountId } = useAccountId();

  return (
    <div className="c-node">
      <p className="font-bold border-b-2">Deposit</p>

      <div className="nodrag cursor-auto">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            From:{' '}
            <AccountSelectSimple
              id="fromAccountId"
              className="mb-2"
              value={fromAccountId}
              onChange={setFromAccountId}
            />
          </div>
          <div>
            To:{' '}
            <AccountSelectSimple
              id="toAccountId"
              className="mb-2"
              value={toAccountId}
              onChange={setToAccountId}
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="mr-[5px]" htmlFor="amount">
            Amount:
          </label>
          <input
            className="px-[5px] py-[2px] text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
            id="amount"
          />
        </div>
      </div>

      <Handle id="in" type="target" position={Position.Top} />
      <Handle id="out" type="source" position={Position.Bottom} />
    </div>
  );
};

export default DepositNote;
