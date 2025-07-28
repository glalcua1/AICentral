export default function SimplePage() {
  return (
    <html>
      <body>
        <div style={{ padding: '40px', fontFamily: 'Arial' }}>
          <h1>Simple Test Page</h1>
          <p>This page has no external dependencies.</p>
          <p>Time: {new Date().toLocaleString()}</p>
          <a href="/" style={{ color: 'blue' }}>← Back to Home</a>
        </div>
      </body>
    </html>
  )
} 