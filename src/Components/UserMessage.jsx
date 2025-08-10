export default function UserMessage({ text }) {
    return (
      <div className="flex justify-end">
        <div className="bg-cyan-500 text-white rounded-lg p-3 max-w-xs break-words shadow-md"
             style={{ marginLeft: 'auto' }}>
          {text}
        </div>
      </div>
    );
  }
  