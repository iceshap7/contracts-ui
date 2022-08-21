const Sidebar = () => {
  const componentClassName = [
    'cursor-grab',
    'border-solid',
    'border-2',
    'border-gray-500',
    'text-gray-700',
    'text-center',
    'mb-2',
  ];

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="p-2">
      <div
        className={componentClassName.join(" ")}
        onDragStart={event => onDragStart(event, 'start')}
        draggable
      >
        Start
      </div>
      <div
        className={componentClassName.join(" ")}
        onDragStart={event => onDragStart(event, 'deposit')}
        draggable
      >
        Deposit
      </div>
      <div
        className={componentClassName.join(" ")}
        onDragStart={event => onDragStart(event, 'end')}
        draggable
      >
        End
      </div>
    </div>
  );
};

export default Sidebar;
