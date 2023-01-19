import { ComponentMeta, ComponentStory } from '@storybook/react'

import { EntityDisplay } from '@dao-dao/stateful'

import { SyncFollowingModal } from './SyncFollowingModal'

export default {
  title:
    'DAO DAO / packages / stateless / components / modals / SyncFollowingModal',
  component: SyncFollowingModal,
} as ComponentMeta<typeof SyncFollowingModal>

const Template: ComponentStory<typeof SyncFollowingModal> = (args) => (
  <SyncFollowingModal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  visible: true,
  onDelete: () => alert('delete'),
  onSync: () => alert('sync'),
  syncing: false,
  followedDaos: [
    'juno10h0hc64jv006rr8qy0zhlu4jsxct8qwa0vtaleayh0ujz0zynf2s2r7v8q',
    'juno1xz54y0ktew0dcm00f9vjw0p7x29pa4j5p9rwq6zerkytugzg27qs4shxnt',
    'juno1rw92sps9q4mm7ll3x9apnunlckchmn3v7cttchsf48dcdyajzj2sajfxcn',
    'juno1gpwekludv6vu8pkpnp2hwwf7f84a7mcvgm9t2cvp92hvpxk07kdq8z4xj2',
    'juno1q7ufzamrmwfw4w35azzkcxd5l44vy8zngm9ufcgryk2dt8clqznsp88lhd',
    'juno1c5v6jkmre5xa9vf9aas6yxewc7aqmjy0rlkkyk4d88pnwuhclyhsrhhns6',
    'juno1czh5dy2kxwwt5hlw6rr2q25clj96sheftsdccswg9qe34m3wzgdswmw8ju',
    'juno1u6zrwaq8e2nug8hvehl3chh8shm0uv7dewku373w82enagghk62svzd3sq',
    'juno1kvtefw5v6w0vlgurvhgjvmu2ny8vg8vy2lwdk9k3h547plh7j6gqvjcqaz',
    'juno1svduqrvcmzpl5g74q8rkm6rhcjnhch2yaagzu4ljuv2u9tf86ltqx9a54s',
    'juno1wgqy9pqcj558wy9xcrv52h3hwd0336q69r2p5x2awyrmztcsw4wsspu97h',
    'juno1m895hnfqhmv9p2jy99c8j32fz7p5y9tvg75wvkyfdu2j2xnc3xesdx6gv6',
    'juno1tr4t593vy37qtqqh28tarmj34yae9za9zlj7xeegx3k8rgvp3xeqv02tu5',
    'juno1z3zqgz7t0hcu2fx4wusuyjq0gc2m33la8l64saunfz7vmqwa2d5sz6jnep',
  ],
  EntityDisplay,
}
