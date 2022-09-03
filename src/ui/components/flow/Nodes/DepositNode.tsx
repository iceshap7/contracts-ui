import { useContext, useEffect, useState } from 'react';
import { Handle, Position } from 'react-flow-renderer';
import DateTimePicker from 'react-datetime-picker';

import { AccountSelectSimple } from 'ui/components/account/SelectSimple';
import { EditorContext } from 'ui/contexts/EditorContext';
import { useAccountId } from 'ui/hooks';

const DepositNote = () => {
  const { value: toAccountId, onChange: setToAccountId } = useAccountId();
  const [withdrawAt, setWithdrawAt] = useState(new Date());
  const { code, setCode } = useContext(EditorContext);

  useEffect(() => {
    setCode({
      type: 'deposit',
      withdrawAt: new Date(withdrawAt).getTime(),
      toAccountId,
    });
  }, []);

  return (
    <div className="c-node">
      <p className="font-bold border-b-2 mb-2">Deposit</p>

      <div className="nodrag cursor-auto">
        <div className="grid grid-cols-10 gap-3 items-center mb-2">
          <div className="col-span-1"><label>To:</label></div>
          <div className="col-span-9">
            <AccountSelectSimple
              id="toAccountId"
              className="mb-2"
              value={toAccountId}
              onChange={accountId => {
                setToAccountId(accountId);
                setCode(prev => {
                  return { ...prev, toAccountId: accountId };
                });
              }}
            />
          </div>
        </div>

        <div className="mb-2">
          <label className="mr-[5px]">Withdraw at:</label>
          <DateTimePicker
            onChange={value => {
              setWithdrawAt(value);
              setCode(prev => {
                return { ...prev, withdrawAt: new Date(value).getTime() };
              });
            }}
            value={withdrawAt}
          />
        </div>
      </div>

      <Handle id="in" type="target" position={Position.Top} />
      <Handle id="out" type="source" position={Position.Bottom} />
    </div>
  );
};

export default DepositNote;
