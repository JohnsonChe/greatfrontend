import Image from 'next/image'
const team = [
  {
    name: 'Joe Jackson',
    title: 'Founder & CEO',
    roleDescription:
      'Joe leads with a strategic vision for innovation and growth. With a passion for combining artistry with technology, he drives our mission to deliver cutting-edge solutions.',
    image:
      'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/projects-images/team-section/starter/img/joe.jpg'
  },
  {
    name: 'Ash Karter',
    title: 'Founder & CFO',
    roleDescription:
      'Ash brings financial acumen and a keen eye for detail to our operations. Her leadership ensures sustainable growth and operational excellence.',
    image:
      'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/projects-images/team-section/starter/img/ash.jpg'
  },
  {
    name: 'Farias Amed',
    title: 'Front End AI Engineer',
    roleDescription:
      'Farias is at the forefront of AI-driven design, developing interfaces that blend intuitive usability with advanced functionality.',
    image:
      'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/projects-images/team-section/starter/img/farias.jpg'
  },
  {
    name: 'Sarah Haust',
    title: 'Dev Ops',
    roleDescription:
      'Sarah orchestrates our development pipelines with precision, ensuring seamless deployment cycles and system reliability.',
    image:
      'https://vaqybtnqyonvlwtskzmv.supabase.co/storage/v1/object/public/projects-images/team-section/starter/img/sarah.jpg'
  }
]

export default function Team() {
  return (
    <div className='py-12 lg:my-24'>
      <div className='text-center'>
        <span className='font-semibold text-indigo-700'>Team</span>
        <h3 className='font-medium text-3xl mt-3 md:text-5xl'>Meet our team</h3>
        <p className='text-[1.45rem]/snug md:text-xl/snug text-neutral-600 mt-5 lg:font-light'>
          From skilled designers to tech-savvy developers, each member brings a unique perspective
          and expertise to the table.
        </p>
      </div>
      <div className='flex flex-col gap-12 mt-12 md:flex-row md:self-stretch md:flex-wrap md:justify-center md:gap-y-8 md:gap-8'>
        {team.map((member, index) => (
          <div className='text-left md:w-[20.5rem] lg:w-[17.25rem]' key={member.title + index}>
            <img
              src={member.image}
              alt=''
              className='self-stretch sm:h-[24.5rem] sm:w-fill md:h-[23.785rem] lg:h-[18.5rem]'
            />
            <span className='block font-semibold text-xl mt-6'>{member.name}</span>
            <span className='block font-medium text-lg text-indigo-700 mt-1'>{member.title}</span>
            <p className='block text-neutral-600 mt-4'>{member.roleDescription}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
