 import user from "../model/user.js"
 import bcrypt from "bcryptjs"
 import jwt from "jsonwebtoken"
//  register user
export const createStudents = async (req, res) => {
    const {
        name,email,phoneNumber,password,country,state,userName,address
    } = req.body
    try {
// check if user name exist
        const exist = await user.findOne({email})
        if (exist) return res.status(400).json
        ({message: 'user Name already exist'})

        // check if phone number exist
        const phone = await user.findOne({phoneNumber})
        if (phone) return res.status(400).json
        ({message: 'phone number already exist'})
        // hash password
    const salt =await bcrypt.genSalt(10)
    const hashPassword =await bcrypt.hash(password, salt)

// create student
        const students = await user.create({
            name,email,phoneNumber,password:hashPassword,country,state,userName,address
        })
       return res.status(201).json({
        message:"Registeration Successful", students
       })

    }catch (error) {
        console.error(error)
        res.status(500).json({message:"Server Error", error})

    }



    // create user
    const students =await student.create({
        name, email,
        phoneNumber,
        password:hashPassword,
        country,
        state

    })

    
}


// Get all users
    export const getAllStudents = async(req, res) => {
        try {
            let students= await user.find().select('-password' )
            res.status(200).json(students)
        } catch (error) {
            res.status(500).json({message:"server, error", error})
        }


    }
    // login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // Basic request validation
    if (!email) {
        return res.status(400).json({ message: "Email Does Not Exist" });
    }
if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    try {
        // Find user document
        const student = await user.findOne({ email });

        // Check result and return a clear error if not found
        if (!student) return res.status(404).json({ message: "Email not registered" });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, student.password);
        if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

        // Issue token (expiresIn should be a valid duration like '1h')
        const token = jwt.sign({ id: student._id }, process.env.SECRET_KEY || "secret", { expiresIn: "1h" });

        // Return only the fields we need
        return res.status(200).json({
            message: "Login successful",
            token,
            student: {
                id: student._id,
                name: student.name,
                email: student.email,
                phoneNumber: student.phoneNumber,
            },
        });
    } catch (error) {
        console.error("loginUser error:", error);
        return res.status(500).json({ message: "Server error", error: error.message });
    }
};
    // get students by id
    export const getUserById = async (req, res) => {
        const studentId = req.params.id;
        try{
            const student = await user.findById(studentId).select('-password')
            if(!student) return res.status(404).json({message: "student not found"})
                return res.status(200).json(student)
        } catch (error) {
            res.status(500).json({message:error.message})
        }
        }       
     
    // update user 
    export const updateUser = async(req, res)=>{
        let studentId = req.params.id
        const {name, email, phoneNumber, password, country,state}= req.body
        try {
            let student = await user.findByIdAndUpdate(studentId)
            if(!student) return res.status(404).json({message: "user not found"})
           
            //    update only provided fields
            student.name = name || student.name
            student.email = email || student.email
            student.phoneNumber = phoneNumber || student.phoneNumber
            student.password = password || student.password
            student.country = country || student.country
            student.state = state || student.state
            await student.save()
            res.status(200).json({message: "user updated successfully", student:
               {
                 id: student._id,
                name: student.name,
                email: student.email,
                phoneNumber: student.phoneNumber,
                country: student.country,
                state: student.state   
               }
            })
        } catch (error) {
            res.status(500).json({message: "server error", error: error.message})
        }
    }
    // delete user
    export const deleteUser = async (req, res) => {
        let studentId = req.params.id
        try {
            const student = await user.findByIdAndDelete(studentId)
            if(!student) return res.status(404).json({message: "user not found"})
                await student.deleteOne()
            res.status(200).json({message: "user deleted successfully"})
        } catch (error) {
            res.status(500).json({message: "server error", error: error.message})
        }
    }