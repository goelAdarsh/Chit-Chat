import Link from 'next/link';

export default function WelcomePage() {
    return (
        <div>
            <div>
                <h1>Welcome to Chit-Chat!</h1>
                <p>A simple and secure way to connect with your friends.</p>

                <div>
                    <p>
                        <strong>Features:</strong>
                    </p>

                    <ul>
                        <li>💬 Seamless real-time messaging</li>
                        <li>🔒 End-to-end encryption</li>
                        <li>📱 Available on all devices</li>
                        <li>👥 Create and manage groups</li>
                    </ul>
                </div>
                <button>
                    <Link href="/join">Get started</Link>
                </button>
            </div>
        </div>
    );
}
