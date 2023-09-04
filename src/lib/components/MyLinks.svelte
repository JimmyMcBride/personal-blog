<script lang="ts">
	import { Icon } from "flowbite-svelte-icons"
	import IconWrapper from "./IconWrapper.svelte"
	import { modeCurrent } from "@skeletonlabs/skeleton"
	import { onDestroy } from "svelte"

	let fillColor: string

	const unsubscribe = modeCurrent.subscribe((value) => {
		fillColor = value ? "#000" : "#fff"
	})

	onDestroy(unsubscribe)
</script>

<div class="flex flex-wrap gap-4">
	<IconWrapper>
		<a href="https://www.linkedin.com/in/jimmy-mcbride-183072b6/" target="_blank">
			<Icon name="linkedin-solid" size="md" />
		</a>
	</IconWrapper>

	<IconWrapper>
		<a href="https://github.com/JimmyMcBride" target="_blank">
			<Icon name="github-solid" size="md" />
		</a>
	</IconWrapper>

	<IconWrapper>
		<a href="https://twitter.com/McBride1105" target="_blank">
			<Icon name="twitter-solid" size="md" />
		</a>
	</IconWrapper>

	<IconWrapper>
		<a href="https://discord.gg/4PCy4Bz" target="_blank">
			<Icon name="discord-solid" size="md" />
		</a>
	</IconWrapper>

	<IconWrapper>
		<a href="https://dev.to/jimmymcbride" target="_blank">
			<svg
				width="1.25rem"
				height="1.25rem"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 448 512"
				><path
					fill={fillColor}
					d="M120.12 208.29c-3.88-2.9-7.77-4.35-11.65-4.35H91.03v104.47h17.45c3.88 0 7.77-1.45 11.65-4.35 3.88-2.9 5.82-7.25 5.82-13.06v-69.65c-.01-5.8-1.96-10.16-5.83-13.06zM404.1 32H43.9C19.7 32 .06 51.59 0 75.8v360.4C.06 460.41 19.7 480 43.9 480h360.2c24.21 0 43.84-19.59 43.9-43.8V75.8c-.06-24.21-19.7-43.8-43.9-43.8zM154.2 291.19c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28l.01 70.93zm100.68-88.66H201.6v38.42h32.57v29.57H201.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19l-.01 29.52zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58l-38.46 144.8z"
				/></svg
			>
		</a>
	</IconWrapper>

	<IconWrapper>
		<a href="/rss.xml" target="_blank">
			<svg
				fill={fillColor}
				width="1.25rem"
				height="1.25rem"
				role="img"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 461.432 461.432"
			>
				<g id="lines__x003C_Group_x003E_">
					<g id="circle">
						<path
							d="M125.896,398.928c0,33.683-27.308,60.999-61.022,60.999c-33.684,0-61.006-27.316-61.006-60.999
			c0-33.729,27.322-61.038,61.006-61.038C98.588,337.89,125.896,365.198,125.896,398.928z"
						/>
					</g>
					<g>
						<g>
							<path
								d="M0,229.636c0,8.441,6.606,15.379,15.036,15.809c60.318,3.076,100.885,25.031,138.248,62.582
				c36.716,36.864,60.071,89.759,64.082,137.769c0.686,8.202,7.539,14.524,15.77,14.524h56.701c4.344,0,8.498-1.784,11.488-4.935
				c2.992-3.15,4.555-7.391,4.333-11.729c-8.074-158.152-130.669-278.332-289.013-286.23c-4.334-0.217-8.564,1.355-11.709,4.344
				C1.792,164.759,0,168.908,0,173.247V229.636z"
							/>
						</g>
					</g>
					<g>
						<g>
							<path
								d="M0,73.411c0,8.51,6.713,15.482,15.216,15.819c194.21,7.683,350.315,161.798,358.098,355.879
				c0.34,8.491,7.32,15.208,15.818,15.208h56.457c4.297,0,8.408-1.744,11.393-4.834c2.985-3.09,4.585-7.258,4.441-11.552
				C453.181,199.412,261.024,9.27,16.38,1.121C12.089,0.978,7.925,2.583,4.838,5.568C1.751,8.551,0,12.661,0,16.954V73.411z"
							/>
						</g>
					</g>
				</g>
			</svg>
		</a>
	</IconWrapper>
</div>
