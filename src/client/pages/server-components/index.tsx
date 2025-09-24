import { Page } from '@/shared/page'
import { ClientWrapper } from '@/components/@shared/client-wrapper'
import { ServerComponentLoader } from '@/components/@shared/server-component-loader'

// Demo page showcasing server components
const ServerComponents = () => {
	return (
		<div>
			<h3>🚀 React Server Components Demo</h3>
			<p style={{ color: '#666' }}>
				This page demonstrates server components integration with live server-rendered components.
			</p>
			
			<div style={{ 
				background: '#d4edda', 
				border: '1px solid #28a745',
				padding: '1rem', 
				borderRadius: '8px',
				margin: '1rem 0' 
			}}>
				<h4>✅ Implementation Status</h4>
				<ul>
					<li>✅ Server component files created</li>
					<li>✅ Client boundary components ready</li>
					<li>✅ RSC rendering pipeline implemented</li>
					<li>✅ Build system integration complete</li>
				</ul>
			</div>

			<ClientWrapper>
				<div style={{ marginBottom: '2rem' }}>
					<h4>📝 Server-Rendered Posts</h4>
					<ServerComponentLoader 
						component="Posts" 
						fallback={<div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
							🔄 Loading server component...
						</div>}
					/>
				</div>

				<div style={{ marginBottom: '2rem' }}>
					<h4>👤 Server-Rendered User Profile</h4>
					<ServerComponentLoader 
						component="UserProfile" 
						props={{ userId: 1 }}
						fallback={<div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
							🔄 Loading user profile...
						</div>}
					/>
				</div>

				<div>
					<h4>🏗️ Server-Rendered Layout Component</h4>
					<ServerComponentLoader 
						component="ServerLayout" 
						props={{ title: "Dynamic Server Layout" }}
						fallback={<div style={{ padding: '2rem', textAlign: 'center', background: '#f8f9fa', borderRadius: '8px' }}>
							🔄 Loading layout component...
						</div>}
					/>
				</div>
			</ClientWrapper>
		</div>
	)
}

export default () => {
	return (
		<Page title='SSR: Server Components Demo'>
			<ServerComponents />
		</Page>
	)
}