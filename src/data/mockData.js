/**
 * Mock data for the Smart Education Platform
 * All data runs in-browser without requiring an external database.
 */

export const departments = [
  "Computer Engineering",
  "Information Technology",
  "Electronics",
  "Mechanical",
  "Civil"
];

export const initialFaculty = [
  {
    id: "fac-1",
    name: "Dr. Meera Shah",
    department: "Computer Engineering",
    expertise: "Machine Learning",
    maxHours: 16,
    assignedHours: 11,
    status: "Available",
    avatar: "MS",
    email: "meera.shah@smartedu.ac.in",
    office: "Tech Block A-301"
  },
  {
    id: "fac-2",
    name: "Prof. Rahul Patel",
    department: "Computer Engineering",
    expertise: "Data Structures",
    maxHours: 16,
    assignedHours: 14,
    status: "In Class",
    avatar: "RP",
    email: "rahul.patel@smartedu.ac.in",
    office: "Tech Block A-205"
  },
  {
    id: "fac-3",
    name: "Prof. Anita Desai",
    department: "Computer Engineering",
    expertise: "Database Systems",
    maxHours: 14,
    assignedHours: 12,
    status: "Available",
    avatar: "AD",
    email: "anita.desai@smartedu.ac.in",
    office: "Tech Block A-209"
  },
  {
    id: "fac-4",
    name: "Dr. Kiran Joshi",
    department: "Computer Engineering",
    expertise: "Computer Networks",
    maxHours: 14,
    assignedHours: 11,
    status: "Available",
    avatar: "KJ",
    email: "kiran.joshi@smartedu.ac.in",
    office: "Tech Block B-102"
  },
  {
    id: "fac-5",
    name: "Prof. Neha Trivedi",
    department: "Computer Engineering",
    expertise: "Operating Systems",
    maxHours: 14,
    assignedHours: 12,
    status: "Available",
    avatar: "NT",
    email: "neha.trivedi@smartedu.ac.in",
    office: "Tech Block B-104"
  },
  {
    id: "fac-6",
    name: "Dr. Sanjay Verma",
    department: "Information Technology",
    expertise: "Cloud Computing",
    maxHours: 14,
    assignedHours: 10,
    status: "In Class",
    avatar: "SV",
    email: "sanjay.verma@smartedu.ac.in",
    office: "IT Wing C-402"
  },
  {
    id: "fac-7",
    name: "Prof. Pooja Sharma",
    department: "Electronics",
    expertise: "Embedded Systems & IoT",
    maxHours: 12,
    assignedHours: 9,
    status: "Available",
    avatar: "PS",
    email: "pooja.sharma@smartedu.ac.in",
    office: "ECE Wing D-101"
  },
  {
    id: "fac-8",
    name: "Prof. Amit Kulkarni",
    department: "Computer Engineering",
    expertise: "Cyber Security",
    maxHours: 12,
    assignedHours: 8,
    status: "On Leave",
    avatar: "AK",
    email: "amit.kulkarni@smartedu.ac.in",
    office: "Tech Block A-312"
  }
];

export const initialRooms = [
  {
    id: "Room-204",
    name: "Room-204",
    type: "Classroom",
    capacity: 60,
    status: "Active",
    currentClass: "Machine Learning",
    currentStrength: 52,
    equipment: ["Projector", "Smart Board", "IoT Sensors", "AC"],
    temperature: 23,
    humidity: 48,
    airQuality: "Good (38 AQI)"
  },
  {
    id: "Room-101",
    name: "Room-101",
    type: "Classroom",
    capacity: 60,
    status: "Available",
    currentClass: null,
    currentStrength: 0,
    equipment: ["Projector", "Smart Board", "AC"],
    temperature: 24,
    humidity: 50,
    airQuality: "Good (42 AQI)"
  },
  {
    id: "Lab-302",
    name: "Lab-302",
    type: "Lab",
    capacity: 30,
    status: "Active",
    currentClass: "Machine Learning Lab",
    currentStrength: 28,
    equipment: ["High-End Computers", "Projector", "IoT Sensors", "AC"],
    temperature: 21,
    humidity: 45,
    airQuality: "Excellent (25 AQI)"
  },
  {
    id: "Lab-105",
    name: "Lab-105",
    type: "Lab",
    capacity: 30,
    status: "Active",
    currentClass: "Data Structures Lab",
    currentStrength: 26,
    equipment: ["Computers", "Smart Board", "AC"],
    temperature: 22,
    humidity: 46,
    airQuality: "Good (35 AQI)"
  },
  {
    id: "Hall-A",
    name: "Hall-A",
    type: "Hall",
    capacity: 120,
    status: "Available",
    currentClass: null,
    currentStrength: 0,
    equipment: ["Dual Display", "Surround Audio", "IoT Sensors", "AC"],
    temperature: 25,
    humidity: 52,
    airQuality: "Moderate (55 AQI)"
  },
  {
    id: "Room-303",
    name: "Room-303",
    type: "Classroom",
    capacity: 60,
    status: "Active",
    currentClass: "Database Systems",
    currentStrength: 45,
    equipment: ["Smart Board", "IoT Sensors", "AC"],
    temperature: 23,
    humidity: 47,
    airQuality: "Good (39 AQI)"
  },
  {
    id: "Seminar-1",
    name: "Seminar-1",
    type: "Hall",
    capacity: 80,
    status: "Available",
    currentClass: null,
    currentStrength: 0,
    equipment: ["Video Conf", "Mic System", "Projector", "AC"],
    temperature: 24,
    humidity: 49,
    airQuality: "Good (41 AQI)"
  },
  {
    id: "Lab-401",
    name: "Lab-401",
    type: "Lab",
    capacity: 35,
    status: "Active",
    currentClass: "Computer Networks Lab",
    currentStrength: 30,
    equipment: ["Server Racks", "Networking Kits", "Computers", "AC"],
    temperature: 20,
    humidity: 42,
    airQuality: "Excellent (22 AQI)"
  },
  {
    id: "Room-210",
    name: "Room-210",
    type: "Classroom",
    capacity: 55,
    status: "Available",
    currentClass: null,
    currentStrength: 0,
    equipment: ["Smart Board", "Projector", "AC"],
    temperature: 24,
    humidity: 51,
    airQuality: "Good (44 AQI)"
  }
];

export const initialSubjects = [
  {
    id: "sub-1",
    name: "Machine Learning",
    code: "CS401",
    type: "Lecture",
    weeklyHours: 3,
    faculty: "Dr. Meera Shah",
    color: "indigo",
    department: "Computer Engineering"
  },
  {
    id: "sub-2",
    name: "Machine Learning Lab",
    code: "CS401L",
    type: "Lab",
    weeklyHours: 2,
    faculty: "Dr. Meera Shah",
    color: "indigo",
    department: "Computer Engineering"
  },
  {
    id: "sub-3",
    name: "Data Structures",
    code: "CS201",
    type: "Lecture",
    weeklyHours: 3,
    faculty: "Prof. Rahul Patel",
    color: "emerald",
    department: "Computer Engineering"
  },
  {
    id: "sub-4",
    name: "Data Structures Lab",
    code: "CS201L",
    type: "Lab",
    weeklyHours: 2,
    faculty: "Prof. Rahul Patel",
    color: "emerald",
    department: "Computer Engineering"
  },
  {
    id: "sub-5",
    name: "Database Systems",
    code: "CS302",
    type: "Lecture",
    weeklyHours: 3,
    faculty: "Prof. Anita Desai",
    color: "amber",
    department: "Computer Engineering"
  },
  {
    id: "sub-6",
    name: "Database Systems Lab",
    code: "CS302L",
    type: "Lab",
    weeklyHours: 2,
    faculty: "Prof. Anita Desai",
    color: "amber",
    department: "Computer Engineering"
  },
  {
    id: "sub-7",
    name: "Computer Networks",
    code: "CS305",
    type: "Lecture",
    weeklyHours: 3,
    faculty: "Dr. Kiran Joshi",
    color: "purple",
    department: "Computer Engineering"
  },
  {
    id: "sub-8",
    name: "Operating Systems",
    code: "CS304",
    type: "Lecture",
    weeklyHours: 3,
    faculty: "Prof. Neha Trivedi",
    color: "rose",
    department: "Computer Engineering"
  }
];

export const defaultDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const defaultTimeSlots = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00", // Lunch Break
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00"
];

export const LUNCH_BREAK_SLOT = "13:00 - 14:00";

// Pre-built valid zero-conflict timetable
export const defaultTimetable = [
  // Monday
  {
    id: "sess-1",
    day: "Monday",
    slot: "09:00 - 10:00",
    subject: "Machine Learning",
    faculty: "Dr. Meera Shah",
    room: "Room-204",
    type: "Lecture",
    color: "indigo"
  },
  {
    id: "sess-2",
    day: "Monday",
    slot: "10:00 - 11:00",
    subject: "Data Structures",
    faculty: "Prof. Rahul Patel",
    room: "Room-101",
    type: "Lecture",
    color: "emerald"
  },
  {
    id: "sess-3",
    day: "Monday",
    slot: "11:00 - 12:00",
    subject: "Computer Networks",
    faculty: "Dr. Kiran Joshi",
    room: "Room-204",
    type: "Lecture",
    color: "purple"
  },
  {
    id: "sess-4",
    day: "Monday",
    slot: "12:00 - 13:00",
    subject: "Operating Systems",
    faculty: "Prof. Neha Trivedi",
    room: "Room-101",
    type: "Lecture",
    color: "rose"
  },
  {
    id: "sess-5",
    day: "Monday",
    slot: "14:00 - 15:00",
    subject: "Machine Learning Lab",
    faculty: "Dr. Meera Shah",
    room: "Lab-302",
    type: "Lab",
    color: "indigo"
  },
  {
    id: "sess-6",
    day: "Monday",
    slot: "15:00 - 16:00",
    subject: "Machine Learning Lab",
    faculty: "Dr. Meera Shah",
    room: "Lab-302",
    type: "Lab",
    color: "indigo"
  },

  // Tuesday
  {
    id: "sess-7",
    day: "Tuesday",
    slot: "09:00 - 10:00",
    subject: "Database Systems",
    faculty: "Prof. Anita Desai",
    room: "Room-204",
    type: "Lecture",
    color: "amber"
  },
  {
    id: "sess-8",
    day: "Tuesday",
    slot: "10:00 - 11:00",
    subject: "Operating Systems",
    faculty: "Prof. Neha Trivedi",
    room: "Room-101",
    type: "Lecture",
    color: "rose"
  },
  {
    id: "sess-9",
    day: "Tuesday",
    slot: "11:00 - 12:00",
    subject: "Data Structures",
    faculty: "Prof. Rahul Patel",
    room: "Room-204",
    type: "Lecture",
    color: "emerald"
  },
  {
    id: "sess-10",
    day: "Tuesday",
    slot: "14:00 - 15:00",
    subject: "Data Structures Lab",
    faculty: "Prof. Rahul Patel",
    room: "Lab-105",
    type: "Lab",
    color: "emerald"
  },
  {
    id: "sess-11",
    day: "Tuesday",
    slot: "15:00 - 16:00",
    subject: "Data Structures Lab",
    faculty: "Prof. Rahul Patel",
    room: "Lab-105",
    type: "Lab",
    color: "emerald"
  },

  // Wednesday
  {
    id: "sess-12",
    day: "Wednesday",
    slot: "09:00 - 10:00",
    subject: "Computer Networks",
    faculty: "Dr. Kiran Joshi",
    room: "Room-101",
    type: "Lecture",
    color: "purple"
  },
  {
    id: "sess-13",
    day: "Wednesday",
    slot: "10:00 - 11:00",
    subject: "Machine Learning",
    faculty: "Dr. Meera Shah",
    room: "Room-204",
    type: "Lecture",
    color: "indigo"
  },
  {
    id: "sess-14",
    day: "Wednesday",
    slot: "11:00 - 12:00",
    subject: "Database Systems",
    faculty: "Prof. Anita Desai",
    room: "Room-101",
    type: "Lecture",
    color: "amber"
  },
  {
    id: "sess-15",
    day: "Wednesday",
    slot: "14:00 - 15:00",
    subject: "Database Systems Lab",
    faculty: "Prof. Anita Desai",
    room: "Lab-302",
    type: "Lab",
    color: "amber"
  },
  {
    id: "sess-16",
    day: "Wednesday",
    slot: "15:00 - 16:00",
    subject: "Database Systems Lab",
    faculty: "Prof. Anita Desai",
    room: "Lab-302",
    type: "Lab",
    color: "amber"
  },

  // Thursday
  {
    id: "sess-17",
    day: "Thursday",
    slot: "09:00 - 10:00",
    subject: "Operating Systems",
    faculty: "Prof. Neha Trivedi",
    room: "Room-204",
    type: "Lecture",
    color: "rose"
  },
  {
    id: "sess-18",
    day: "Thursday",
    slot: "10:00 - 11:00",
    subject: "Data Structures",
    faculty: "Prof. Rahul Patel",
    room: "Room-101",
    type: "Lecture",
    color: "emerald"
  },
  {
    id: "sess-19",
    day: "Thursday",
    slot: "11:00 - 12:00",
    subject: "Computer Networks",
    faculty: "Dr. Kiran Joshi",
    room: "Room-204",
    type: "Lecture",
    color: "purple"
  },

  // Friday
  {
    id: "sess-20",
    day: "Friday",
    slot: "09:00 - 10:00",
    subject: "Database Systems",
    faculty: "Prof. Anita Desai",
    room: "Room-101",
    type: "Lecture",
    color: "amber"
  },
  {
    id: "sess-21",
    day: "Friday",
    slot: "11:00 - 12:00",
    subject: "Machine Learning",
    faculty: "Dr. Meera Shah",
    room: "Room-204",
    type: "Lecture",
    color: "indigo"
  }
];

export const analyticsData = {
  weeklyUtilization: [
    { day: "Mon", rate: 92, sessions: 6 },
    { day: "Tue", rate: 96, sessions: 5 },
    { day: "Wed", rate: 94, sessions: 5 },
    { day: "Thu", rate: 95, sessions: 3 },
    { day: "Fri", rate: 88, sessions: 2 }
  ],
  lectureVsLab: {
    lectures: 15,
    labs: 6,
    lecturePercent: 71,
    labPercent: 29
  },
  hourlyOccupancy: [
    { hour: "09:00", rate: 85 },
    { hour: "10:00", rate: 92 },
    { hour: "11:00", rate: 98 },
    { hour: "12:00", rate: 70 },
    { hour: "13:00", rate: 5 }, // lunch break
    { hour: "14:00", rate: 90 },
    { hour: "15:00", rate: 88 },
    { hour: "16:00", rate: 45 }
  ],
  kpi: {
    averageUtilization: "94%",
    peakHour: "11:00 AM - 12:00 PM",
    mostUsedRoom: "Room-204 (96%)",
    facultyBalance: "Balanced (Avg 12.8 hrs/wk)"
  },
  recommendations: [
    {
      id: 1,
      title: "Optimize Friday Schedule",
      description: "Room-101 is under-used on Friday afternoons. Moving 2 elective lectures there could increase weekly room balance by 7%."
    },
    {
      id: 2,
      title: "Lab-302 High Demand",
      description: "Machine Learning and Database labs both utilize Lab-302. Consider assigning alternative sessions to Lab-401 for smoother equipment distribution."
    },
    {
      id: 3,
      title: "Morning Peak Load",
      description: "Peak classroom occupancy is concentrated between 10:00 AM and 12:00 PM. Shifting 1 lecture to 16:00 will ease campus corridor traffic."
    }
  ]
};
