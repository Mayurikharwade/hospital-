"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Stethoscope,
  Clock,
  DollarSign,
  Globe,
  Camera,
  Edit,
  Save,
  X,
  CheckCircle,
  AlertCircle,
  FileText,
  Upload,
  Eye,
  Award,
  Calendar,
  Heart,
  Building2,
  Languages,
  Sparkles,
  ShieldCheck,
  Verified,
  Calendar as CalendarIcon
} from "lucide-react";

export default function DoctorProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [viewingDoc, setViewingDoc] = useState(null); 
  
  // Doctor Profile Data
  const [profile, setProfile] = useState({
    firstName: "Dr. Shruthika Reddy",
    age: 37,
    phone: "+91 98765 43210",
    email: "shruthika@eashaop.com",
    gender: "Female",
    consultationMode: "Both",
    hospitalName: "IndoUs Hospital",
    hospitalAddress: "IndoUs Hospital, Hitech City, Hyderabad",
    qualification: "MBBS, MD (Cardiology)",
    university: "Amity University",
    experience: "12",
    speciality: "Cardiologist",
    consultationFee: "1200",
    expertise: "Interventional Cardiology, Heart Failure Management, Preventive Cardiology",
    languages: {
      english: true,
      hindi: true,
      telugu: true,
      tamil: false,
      kannada: false
    },
    description: "Dr. Shruthika Reddy is a renowned Cardiologist with over 12 years of experience.",
    documents: {
      medicalLicense: null,
      govtId: null,
      educationCertificate: null
    }
  });

  const showNotification = (msg) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleSave = () => {
    localStorage.setItem("doctor_profile", JSON.stringify(profile));
    setIsEditing(false);
    showNotification("Profile updated successfully! ✅");
  };

  const handleCancel = () => {
    setIsEditing(false);
    showNotification("Changes cancelled");
  };

  const handleLanguageToggle = (lang) => {
    setProfile(prev => ({
      ...prev,
      languages: {
        ...prev.languages,
        [lang]: !prev.languages[lang]
      }
    }));
  };

  useEffect(() => {
    const saved = localStorage.getItem("doctor_profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const languageLabels = {
    english: "English",
    hindi: "Hindi",
    telugu: "Telugu",
    tamil: "Tamil",
    kannada: "Kannada"
  };

  const getDocumentDetails = (type) => {
    switch (type) {
      case "medicalLicense":
        return {
          title: "Medical License / Registration Certificate",
          verified: true,
          fields: [
            { label: "Registration No", value: "MCI-2014-98765", icon: FileText },
            { label: "State Medical Council", value: "Telangana State Medical Council", icon: Building2 },
            { label: "Date of Registration", value: "12 June 2014", icon: CalendarIcon },
            { label: "License Status", value: "Active / Verified", isStatus: true, icon: ShieldCheck },
            { label: "Validity", value: "Permanent (Renewed till Dec 2029)", icon: CalendarIcon }
          ]
        };
      case "govtId":
        return {
          title: "Government Issued ID (Aadhaar Card)",
          verified: true,
          fields: [
            { label: "Document Type", value: "Aadhaar Card", icon: FileText },
            { label: "Document Number", value: "XXXX-XXXX-4321", icon: ShieldCheck },
            { label: "Name on ID", value: "Dr. Shruthika Reddy", icon: User },
            { label: "Verification Status", value: "Verified Successfully", isStatus: true, icon: Verified },
            { label: "Issued By", value: "UIDAI", icon: Building2 }
          ]
        };
      case "educationCertificate":
        return {
          title: "Degree & Education Certificate",
          verified: true,
          fields: [
            { label: "Degree Obtained", value: "Doctor of Medicine (MD) - Cardiology", icon: GraduationCap },
            { label: "University/Institute", value: "Amity University", icon: Building2 },
            { label: "Passing Year", value: "2014", icon: CalendarIcon },
            { label: "Verification Status", value: "Genuine / Verified", isStatus: true, icon: Verified },
            { label: "Grade/Division", value: "First Class with Distinction", icon: Award }
          ]
        };
      default:
        return null;
    }
  };

  const docDetails = viewingDoc ? getDocumentDetails(viewingDoc) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-teal-50/30">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-500 text-white px-5 py-2.5 rounded-xl shadow-lg text-sm font-medium flex items-center gap-2 animate-in slide-in-from-top-2">
          <Sparkles className="w-4 h-4" /> {toastMessage}
        </div>
      )}

      {/* Document Viewer Modal - Fixed CSS and Structure */}
      {viewingDoc && docDetails && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setViewingDoc(null)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden" onClick={e => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#013A63] to-[#00A99D] px-5 py-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Document Details
                </h3>
                <button onClick={() => setViewingDoc(null)} className="text-white/80 hover:text-white transition">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Modal Body */}
            <div className="p-5">
              {/* Document Title Card */}
              <div className="bg-teal-50 rounded-xl p-4 mb-5 flex items-start gap-3 border border-teal-100">
                <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#00A99D]" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-sm">{docDetails.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    Verified Document Source
                  </p>
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-4">
                {docDetails.fields.map((field, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <field.icon className="w-3.5 h-3.5 text-[#00A99D]" />
                      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{field.label}</span>
                    </div>
                    {field.isStatus ? (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-sm font-semibold text-green-700">{field.value}</span>
                      </div>
                    ) : (
                      <p className="text-sm font-medium text-slate-800 mt-0.5 pl-5">{field.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-5 py-4 bg-slate-50 border-t border-slate-100">
              <button 
                onClick={() => setViewingDoc(null)}
                className="w-full py-2.5 bg-white border border-slate-200 text-slate-600 rounded-xl text-sm font-medium hover:bg-slate-100 transition shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-4 py-6 md:py-8">
        
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 mb-1">
              <User className="w-5 h-5 text-[#00A99D]" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#013A63] to-[#00A99D] bg-clip-text text-transparent">
                Doctor Profile
              </h1>
            </div>
            <button
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                isEditing 
                  ? "bg-green-500 text-white hover:bg-green-600" 
                  : "bg-[#00A99D] text-white hover:bg-[#009488]"
              }`}
            >
              {isEditing ? <Save className="w-4 h-4" /> : <Edit className="w-4 h-4" />}
              {isEditing ? "Save Profile" : "Edit Profile"}
            </button>
          </div>
          <p className="text-slate-500 text-sm ml-7">Manage your professional information and credentials</p>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6">
          <div className="h-24 bg-gradient-to-r from-[#013A63] to-[#00A99D]"></div>
          
          <div className="relative px-6 pb-6">
            <div className="flex justify-between items-end -mt-12">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=150&h=150"
                  alt="Doctor Profile"
                  className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover bg-white"
                />
                {isEditing && (
                  <button className="absolute bottom-0 right-0 bg-[#00A99D] p-1.5 rounded-full text-white hover:bg-[#009488] transition shadow-sm border-2 border-white">
                    <Camera className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">Speciality</p>
                <p className="text-sm font-semibold text-[#013A63]">{profile.speciality}</p>
              </div>
            </div>

            {!isEditing ? (
              <h2 className="text-xl font-bold text-[#013A63] mt-3">{profile.firstName}</h2>
            ) : (
              <input
                type="text"
                value={profile.firstName}
                onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                className="mt-3 w-full max-w-sm px-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#00A99D] text-base font-semibold"
              />
            )}
          </div>
        </div>

        <div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Left Column - Personal Information */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00A99D]" />
                    <h3 className="font-semibold text-[#013A63] text-sm">Personal Information</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Full Name</label>
                    {isEditing ? (
                      <input type="text" value={profile.firstName} onChange={(e) => setProfile({...profile, firstName: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                    ) : (
                      <p className="text-sm font-medium text-slate-800">{profile.firstName}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Age</label>
                      {isEditing ? (
                        <input type="number" value={profile.age} onChange={(e) => setProfile({...profile, age: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profile.age} years</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Gender</label>
                      {isEditing ? (
                        <select value={profile.gender} onChange={(e) => setProfile({...profile, gender: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none">
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profile.gender}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Phone Number</label>
                    {isEditing ? (
                      <input type="tel" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                    ) : (
                      <p className="text-sm font-medium text-slate-800">{profile.phone}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Email Address</label>
                    {isEditing ? (
                      <input type="email" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                    ) : (
                      <p className="text-sm font-medium text-slate-800">{profile.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Languages Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Languages className="w-4 h-4 text-[#00A99D]" />
                    <h3 className="font-semibold text-[#013A63] text-sm">Languages Spoken</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-3">
                    {Object.entries(languageLabels).map(([key, label]) => (
                      <label key={key} className="flex items-center gap-2 cursor-pointer">
                        {isEditing ? (
                          <input type="checkbox" checked={profile.languages[key]} onChange={() => handleLanguageToggle(key)} className="w-4 h-4 rounded border-slate-300 text-[#00A99D] focus:ring-[#00A99D]" />
                        ) : (
                          profile.languages[key] && (
                            <div className="flex items-center gap-1 bg-slate-100 px-3 py-1 rounded-full">
                              <CheckCircle className="w-3 h-3 text-[#00A99D]" />
                              <span className="text-sm text-slate-700">{label}</span>
                            </div>
                          )
                        )}
                        {isEditing && <span className="text-sm text-slate-700">{label}</span>}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Professional Information */}
            <div className="space-y-5">
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-[#00A99D]" />
                    <h3 className="font-semibold text-[#013A63] text-sm">Professional Details</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Qualification</label>
                    {isEditing ? (
                      <input type="text" value={profile.qualification} onChange={(e) => setProfile({...profile, qualification: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                    ) : (
                      <p className="text-sm font-medium text-slate-800">{profile.qualification}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">University</label>
                    {isEditing ? (
                      <input type="text" value={profile.university} onChange={(e) => setProfile({...profile, university: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                    ) : (
                      <p className="text-sm text-slate-600">{profile.university}</p>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Years of Experience</label>
                      {isEditing ? (
                        <input type="number" value={profile.experience} onChange={(e) => setProfile({...profile, experience: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                      ) : (
                        <p className="text-sm font-medium text-slate-800">{profile.experience} years</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-1">Consultation Fee (₹)</label>
                      {isEditing ? (
                        <input type="number" value={profile.consultationFee} onChange={(e) => setProfile({...profile, consultationFee: e.target.value})} className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none" />
                      ) : (
                        <p className="text-sm font-semibold text-[#00A99D]">₹{profile.consultationFee}</p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-1">Areas of Expertise</label>
                    {isEditing ? (
                      <textarea value={profile.expertise} onChange={(e) => setProfile({...profile, expertise: e.target.value})} rows="2" className="w-full px-3 py-2 rounded-lg border border-slate-200 text-sm focus:border-[#00A99D] focus:outline-none resize-none" />
                    ) : (
                      <p className="text-sm text-slate-600">{profile.expertise}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Documents Card */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-gradient-to-r from-[#00A99D]/10 to-transparent p-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Upload className="w-4 h-4 text-[#00A99D]" />
                    <h3 className="font-semibold text-[#013A63] text-sm">Documents & Certificates</h3>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {["medicalLicense", "govtId", "educationCertificate"].map((doc) => (
                    <div key={doc} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                      <span className="text-sm text-slate-600 capitalize">
                        {doc === "medicalLicense" ? "Medical License" : doc === "govtId" ? "Government ID" : "Education Certificate"}
                      </span>
                      <button 
                        onClick={() => setViewingDoc(doc)}
                        className="text-xs text-[#00A99D] hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" /> View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons when Editing */}
          {isEditing && (
            <div className="mt-6 flex gap-3 justify-end">
              <button onClick={handleCancel} className="px-6 py-2 rounded-lg border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition">Cancel</button>
              <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-[#00A99D] text-white text-sm font-medium hover:bg-[#009488] transition flex items-center gap-2">
                <Save className="w-4 h-4" /> Update Profile
              </button>
            </div>
          )}

          {/* Back to Dashboard */}
          <div className="mt-8 text-center">
            <Link href="/doctor/dashboard" className="inline-flex items-center gap-1 text-sm text-[#00A99D] font-medium hover:gap-2 transition">
              <ChevronLeft className="w-4 h-4" /> Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}