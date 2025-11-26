const AdminRichTextEditor = ({ value, onChange }) => (
  <textarea
    value={value}
    onChange={(event) => onChange(event.target.value)}
    rows={20}
    placeholder="Write your article content here. You can use HTML tags for formatting..."
    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition resize-y font-mono text-sm"
    style={{
      fontFamily: 'monospace',
      lineHeight: '1.6'
    }}
  />
);

export default AdminRichTextEditor;
