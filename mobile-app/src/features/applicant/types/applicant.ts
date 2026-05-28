export interface Experience {
  title: string
  company: string
  location: string
  from: string
  to: string
  duration: string
  current: boolean
}

interface Education {
  degree: string
  school: string
  year: string
}

interface Certification {
  name: string
  issuer: string
  year: string
}

export interface ApplicantProfileForm {
  id: string
  userId: string
  name: string
  email: string
  country: string
  isOpenToOverseas: boolean
  rawText: string
  extracted: {
    skills: string[]
    experienceYears: number | null
    education: string | null
    previousRoles: string[]
    certifications: string[]  // ← flat strings, not objects
    languages: string[]
  }
  createdAt: string
}

export const APPLICANT_PROFILE_INITIAL_STATE: ApplicantProfileForm = {
  id: '',
  userId: '',
  name: '',
  email: '',
  country: 'PH',
  isOpenToOverseas: false,
  rawText: '',
  extracted: {
    skills: [],
    experienceYears: null,
    education: '',
    previousRoles: [],
    certifications: [],
    languages: [],
  },
  createdAt: '',
}

// export interface ApplicantProfileForm {
//   name: string
//   email: string
//   city: string
//   country: string
//   isOpenToOverseas: boolean
//   rawText: string
//   experience: Experience[]
//   education: Education[]
//   extracted: {
//     skills: string[]
//     experienceYears: number | null
//     education: string
//     previousRoles: string[]
//     certifications: Certification[]
//     languages: string[]
//   }
// }

// export const APPLICANT_PROFILE_INITIAL_STATE: ApplicantProfileForm = {
//   name: 'Maverick Barrientos',
//   email: 'maverick@email.com',
//   city: 'Makati',
//   country: 'PH',
//   isOpenToOverseas: true,
//   rawText: '',
//   experience: [
//     { title: 'Software Engineer', company: 'Google', location: 'California, United States', from: 'Jan 2023', to: 'Present', duration: '2 yrs', current: true },
//     { title: 'Software Engineer', company: 'Amazon Web Services', location: 'Seattle, United States', from: 'Jun 2021', to: 'Dec 2022', duration: '1 yr 6 mos', current: false },
//   ],
//   education: [
//     { degree: 'BS Information Technology', school: 'PHINMA - University of Iloilo', year: 'Graduated 2021' }
//   ],
//   extracted: {
//     skills: ['React Native', 'TypeScript', 'Node.js', 'REST APIs', 'PostgreSQL', 'Git', 'System Design', 'CI/CD', 'AWS', 'Docker'],
//     experienceYears: 3,
//     education: 'BS Computer Science, De La Salle University 2021',
//     previousRoles: ['Junior Developer', 'Software Engineer'],
//     certifications: [
//       { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', year: '2024' },
//       { name: 'Google Cloud Professional', issuer: 'Google', year: '2023' },
//       { name: 'Meta React Native Certification', issuer: 'Meta', year: '2023' },
//     ],
//     languages: ['English', 'Filipino'],
//   }
// }