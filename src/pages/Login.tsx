import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const countries = [
  "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", 
  "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", 
  "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", 
  "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", 
  "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", 
  "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecuador", "Egypt", 
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", 
  "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", 
  "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", 
  "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", 
  "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", 
  "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", 
  "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
  "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", 
  "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", 
  "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", 
  "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", 
  "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", 
  "Moldova, Republic of", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", 
  "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", 
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", 
  "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", 
  "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", 
  "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", 
  "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Serbia", "Seychelles", 
  "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", 
  "South Georgia South Sandwich Islands", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", 
  "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", 
  "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", 
  "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
  "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", 
  "United States", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", 
  "Vatican City State", "Venezuela", "Vietnam", "Virgin Islands (British)", "Virgin Islands (U.S.)", 
  "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire", "Zambia", "Zimbabwe"
];

const Login = () => {
  const navigate = useNavigate();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [country, setCountry] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [twoFactorCode, setTwoFactorCode] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      // Simulate registration
      setShowTwoFactor(true);
    } else {
      // Simulate login - redirect directly to personal homepage for demo
      console.log("Login attempt");
      setTimeout(() => {
        navigate("/home");
      }, 1000);
    }
  };

  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Two factor code submitted:", twoFactorCode);
    // Simulate successful 2FA and redirect to personal homepage
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  const resendCode = () => {
    console.log("Resending code...");
  };

  if (showTwoFactor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Two-factor authentication</h2>
          <p className="text-gray-600 text-center mb-6">
            We've sent a code to your email address
          </p>
          <form onSubmit={handleTwoFactorSubmit} className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Enter the code"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value)}
                className="text-center text-lg tracking-widest"
                maxLength={6}
              />
            </div>
            <Button
              type="button"
              variant="link"
              onClick={resendCode}
              className="w-full text-blue-600"
            >
              Resend code
            </Button>
            <Button type="submit" className="w-full bg-purple-600 hover:bg-purple-700">
              Submit
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-pink-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span className="logo-nu text-5xl">NU</span>
            <span className="logo-massage">massage</span>
          </h1>
          <p className="text-white/90 text-lg max-w-2xl mx-auto">
            Join New Zealand's premier platform for massage and therapy services!
          </p>
        </div>

        {/* Login/Register Form */}
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-1"
                />
              </div>

              {isRegister && (
                <>
                  <div>
                    <Label htmlFor="confirmPassword">Confirm password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="country">Select your country</Label>
                    <Select value={country} onValueChange={setCountry}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select your country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-48 overflow-y-auto scrollable">
                        {countries.map((countryName) => (
                          <SelectItem key={countryName} value={countryName}>
                            {countryName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}
            </div>

            {!isRegister && (
              <div className="text-right">
                <button
                  type="button"
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Forgot your password?
                </button>
              </div>
            )}

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onCheckedChange={(checked) => setKeepLoggedIn(checked as boolean)}
                />
                <Label htmlFor="keepLoggedIn" className="text-sm">
                  Keep me logged in
                </Label>
              </div>

              {isRegister && (
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="acceptTerms"
                    checked={acceptTerms}
                    onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
                    required
                  />
                  <Label htmlFor="acceptTerms" className="text-sm">
                    I agree to the{" "}
                    <a href="#" className="text-purple-600 hover:text-purple-800">
                      Terms and Conditions
                    </a>
                  </Label>
                </div>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3"
            >
              {isRegister ? "Sign up" : "Log in"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {isRegister ? "Already have an account?" : "Don't have an account?"}
            </p>
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold text-purple-600 hover:text-purple-800 mt-1"
            >
              {isRegister ? "Log in" : "Sign up now!"}
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-white/80">
          <div className="mb-4">
            <p>&copy; 2025 <span className="logo-nu">NU</span><span className="logo-massage">massage</span></p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="#" className="hover:text-white">Terms of Use</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Cookie Policy</a>
            <a href="#" className="hover:text-white">Therapist FAQ</a>
            <a href="#" className="hover:text-white">Client FAQ</a>
            <a href="#" className="hover:text-white">Refunds</a>
            <a href="#" className="hover:text-white">Contact Us</a>
            <a href="#" className="hover:text-white">Blog</a>
          </div>
          <div className="flex justify-center items-center gap-4 mt-4">
            <div className="flex items-center gap-2">
              <span>English</span>
              <span>Māori</span>
            </div>
            <button className="text-sm hover:text-white">
              Install Web App
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
