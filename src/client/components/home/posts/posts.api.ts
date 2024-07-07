export function fetchPosts(): Promise<Array<{ id: number; text: string }>> {
	return new Promise(resolve => {
		setTimeout(() => {
			resolve([
				{
					id: 0,
					text: 'I get by with a little help from my friends'
				},
				{
					id: 1,
					text: "I'd like to be under the sea in an octupus's garden"
				},
				{
					id: 2,
					text: 'You got that sand all over your feet'
				}
			])
		}, 3000)
	})
}
