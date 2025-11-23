'use client';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Check, Languages, ArrowRight } from 'lucide-react';
import { useUser, useFirestore, setDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';

const profileSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  birthYear: z.string().nonempty({ message: 'Please select a year.' }),
  appLanguage: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const StepVariants = {
  hidden: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? 200 : -200,
  }),
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 260, damping: 20 },
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction < 0 ? 200 : -200,
    transition: { duration: 0.3 },
  }),
};

export function ProfileSetupDialog() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [direction, setDirection] = React.useState(1);
  const { user } = useUser();
  const firestore = useFirestore();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: '', birthYear: '', appLanguage: 'english' },
  });

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    formState: { errors },
  } = form;
  const appLanguage = watch('appLanguage');

  const years = Array.from(
    { length: new Date().getFullYear() - 1899 },
    (_, i) => (new Date().getFullYear() - i).toString()
  );

  const nextStep = async () => {
    let isValid = false;
    if (step === 0) isValid = await trigger('name');
    if (step === 1) isValid = await trigger('birthYear');
    if (isValid) {
      setDirection(1);
      setStep((s) => s + 1);
    }
  };

  const prevStep = () => {
    setDirection(-1);
    setStep((s) => s - 1);
  };

  const onSubmit = (data: ProfileFormData) => {
    if (!user || !firestore) return;
    const userRef = doc(firestore, 'users', user.uid);
    setDocumentNonBlocking(userRef, {
        name: data.name,
        birthYear: parseInt(data.birthYear, 10),
        appLanguage: data.appLanguage,
        profileCompleted: true,
      },
      { merge: true }
    );
    setIsOpen(false);
  };
  
  React.useEffect(() => {
    // This effect can be used to trigger the dialog based on user profile state
    // For now, we can manually trigger it for testing or set it to open on first load
    const timer = setTimeout(() => setIsOpen(true), 2000); // Open after 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        .glass-card-deep {
          background: rgba(10, 25, 47, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-radius: 24px;
          border-top: 1px solid rgba(0, 224, 255, 0.3);
          border-left: 1px solid rgba(0, 224, 255, 0.3);
          box-shadow: 
            0 8px 32px 0 rgba(0, 0, 0, 0.37),
            inset 0 1px 1px rgba(255, 255, 255, 0.1),
            inset 0 -1px 1px rgba(0, 0, 0, 0.2);
        }
        .form-input {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(0, 224, 255, 0.2);
          color: white;
        }
        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        .form-input:focus {
          outline: none;
          border-color: rgba(0, 224, 255, 0.7);
          box-shadow: 0 0 15px rgba(0, 224, 255, 0.3);
        }
        .year-select {
          color: black;
        }
      `}</style>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card-deep w-full max-w-md m-4 text-white p-6 sm:p-8 rounded-2xl overflow-hidden"
            >
              <AnimatePresence initial={false} custom={direction}>
                {step === 0 && (
                  <motion.div
                    key="step0"
                    custom={direction}
                    variants={StepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-main-accent/20 p-4 rounded-full mb-4 border border-main-accent/50">
                      <User className="w-8 h-8 text-main-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">What should we call you?</h2>
                    <p className="text-white/70 mb-6">Let's get your cyberpunk identity set up.</p>
                    <div className="w-full">
                      <input
                        {...register('name')}
                        placeholder="Enter your name"
                        className="form-input w-full h-12 px-4 rounded-md text-center"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-2">{errors.name.message}</p>}
                    </div>
                    <button onClick={nextStep} className="cyan-glow-button mt-6 w-full h-12 text-lg">
                      Next
                    </button>
                  </motion.div>
                )}

                {step === 1 && (
                  <motion.div
                    key="step1"
                    custom={direction}
                    variants={StepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-main-accent/20 p-4 rounded-full mb-4 border border-main-accent/50">
                      <User className="w-8 h-8 text-main-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">When were you born?</h2>
                    <p className="text-white/70 mb-6">This helps us personalize your experience.</p>
                    <div className="w-full">
                      <select
                        {...register('birthYear')}
                        defaultValue=""
                        className="form-input year-select w-full h-12 px-4 rounded-md text-center"
                      >
                        <option value="" disabled>Select your birth year</option>
                        {years.map((year) => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                      {errors.birthYear && <p className="text-red-400 text-sm mt-2">{errors.birthYear.message}</p>}
                    </div>
                    <div className="flex gap-4 w-full mt-6">
                      <button onClick={prevStep} className="glass-card w-full h-12 text-lg">Back</button>
                      <button onClick={nextStep} className="cyan-glow-button w-full h-12 text-lg">Next</button>
                    </div>
                  </motion.div>
                )}

                {step === 2 && (
                  <motion.div
                    key="step2"
                    custom={direction}
                    variants={StepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="flex flex-col items-center text-center"
                  >
                    <div className="bg-main-accent/20 p-4 rounded-full mb-4 border border-main-accent/50">
                      <Languages className="w-8 h-8 text-main-accent" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Choose your language</h2>
                    <p className="text-white/70 mb-6">Select the language for your app interface.</p>
                    <div className="w-full space-y-3">
                      <div 
                        onClick={() => setValue('appLanguage', 'english')} 
                        className={`glass-card p-4 rounded-lg cursor-pointer border-2 transition-all ${appLanguage === 'english' ? 'border-main-accent shadow-glow-main' : 'border-transparent'}`}
                      >
                        <p className="text-lg font-bold">English</p>
                      </div>
                      <div 
                        onClick={() => setValue('appLanguage', 'hindi')}
                        className={`glass-card p-4 rounded-lg cursor-pointer border-2 transition-all ${appLanguage === 'hindi' ? 'border-main-accent shadow-glow-main' : 'border-transparent'}`}
                      >
                         <p className="text-lg font-bold">हिंदी (Hindi)</p>
                      </div>
                    </div>
                     <div className="flex gap-4 w-full mt-6">
                      <button onClick={prevStep} className="glass-card w-full h-12 text-lg">Back</button>
                      <button onClick={handleSubmit(onSubmit)} className="cyan-glow-button w-full h-12 text-lg flex items-center justify-center gap-2">
                        Finish <ArrowRight className="w-5 h-5"/>
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
