import { useState, useEffect, useRef } from "react"
import { supabase } from "./lib/supabase"
import { QUESTION_BANK, LESSON_CONTENT, SUBJECTS, ACHIEVEMENTS, DAILY_FREE_LIMIT } from "./data/content"

const todayKey = () => new Date().toISOString().slice(0, 10)
const getLevel = (xp) => Math.floor(xp / 100) + 1
const getXPToNext = (xp) => 100 - (xp % 100)

const C = {
  bg:"#070710", surface:"#0f0f1e", surface2:"#161628",
  border:"#ffffff0f", border2:"#ffffff18",
  text:"#f0f0ff", textMid:"#8888aa", textDim:"#44445a",
  brand:"#7c6aff", brandLight:"#a89fff",
  green:"#22c55e", greenDim:"#052e16",
  amber:"#f59e0b", amberDim:"#1c1007",
  blue:"#3b82f6", blueDim:"#0c1a2e",
  red:"#ef4444", redDim:"#450a0a",
}

const font = "'Courier New', Courier, monospace"

const s = {
  root:{ minHeight:"100vh", background:C.bg, fontFamily:font, color:C.text, overflowX:"hidden" },
  wrap:{ maxWidth:600, margin:"0 auto", padding:"0 16px 80px", boxSizing:"border-box" },
  topbar:{ position:"sticky", top:0, zIndex:100, background:`${C.bg}ee`, backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`, padding:"14px 16px", display:"flex", alignItems:"center", justifyContent:"space-between" },
  bottomNav:{ position:"fixed", bottom:0, left:0, right:0, zIndex:100, background:`${C.surface}f0`, backdropFilter:"blur(12px)", borderTop:`1px solid ${C.border}`, display:"flex", justifyContent:"space-around", padding:"8px 0 12px" },
  navBtn:{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", fontFamily:font, padding:"4px 16px" },
  brand:{ fontSize:18, fontWeight:900, letterSpacing:1, color:C.text },
  brandAccent:{ color:C.brand },
  card:{ background:C.surface, border:`1px solid ${C.border}`, borderRadius:14, padding:18, marginBottom:12 },
  cardGlow:{ background:C.surface, border:`1px solid ${C.brand}30`, borderRadius:14, padding:18, marginBottom:12, boxShadow:`0 0 20px ${C.brand}10` },
  btnPrimary:{ width:"100%", padding:"15px", borderRadius:12, border:"none", background:`linear-gradient(135deg,${C.brand},#a855f7)`, color:"#fff", fontFamily:font, fontSize:14, fontWeight:900, letterSpacing:2, cursor:"pointer", boxSizing:"border-box" },
  btnOutline:{ width:"100%", padding:"14px", borderRadius:12, border:`1px solid ${C.border2}`, background:"transparent", color:C.textMid, fontFamily:font, fontSize:13, cursor:"pointer", boxSizing:"border-box" },
  input:{ width:"100%", padding:"14px 16px", borderRadius:10, border:`1px solid ${C.border2}`, background:C.surface2, color:C.text, fontFamily:font, fontSize:14, outline:"none", boxSizing:"border-box" },
  pill:{ display:"inline-block", fontSize:10, letterSpacing:2, padding:"3px 10px", borderRadius:20, fontWeight:900 },
  progBg:{ height:5, background:C.surface2, borderRadius:3, overflow:"hidden" },
  progFill:{ height:"100%", borderRadius:3, transition:"width .4s ease" },
  section:{ fontSize:10, letterSpacing:4, color:C.brand, textTransform:"uppercase", marginBottom:12, marginTop:4 },
}

export default function App() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [screen, setScreen] = useState("splash")
  const [loading, setLoading] = useState(true)
  const [quizSubject, setQuizSubject] = useState("biology")
  const [quizQuestions, setQuizQuestions] = useState([])
  const [quizIndex, setQuizIndex] = useState(0)
  const [quizAnswers, setQuizAnswers] = useState([])
  const [quizResults, setQuizResults] = useState(null)
  const [selectedLesson, setSelectedLesson] = useState(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) { setUser(session.user); loadProfile(session.user.id) }
      else { setLoading(false); setScreen("auth") }
    })
    supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) { setUser(session.user); loadProfile(session.user.id) }
      else { setUser(null); setProfile(null); setScreen("auth") }
    })
  }, [])

  const loadProfile = async (uid) => {
    const { data } = await supabase.from("profiles").select("*").eq("id", uid).single()
    if (data) { setProfile(data); setScreen("home") }
    setLoading(false)
  }

  const updateProfile = async (updates) => {
    if (!user) return
    const { data } = await supabase.from("profiles").update(updates).eq("id", user.id).select().single()
    if (data) setProfile(data)
  }

  const startQuiz = (subject) => {
    const questions = [...QUESTION_BANK[subject]].sort(() => Math.random() - 0.5).slice(0, 10)
    setQuizSubject(subject); setQuizQuestions(questions)
    setQuizIndex(0); setQuizAnswers([]); setQuizResults(null)
    setScreen("quiz")
  }

  const submitAnswer = async (selected) => {
    const q = quizQuestions[quizIndex]
    const correct = selected === q.answer
    const newAnswers = [...quizAnswers, { selected, correct, questionId:q.id }]
    const today = todayKey()
    const dailyCount = profile?.daily_count || {}
    const newDailyCount = { ...dailyCount, [today]:(dailyCount[today]||0)+1 }
    const newXP = (profile?.xp||0) + (correct?10:2)
    const newStreak = correct ? (profile?.streak||0)+1 : 0
    const newBestStreak = Math.max(profile?.best_streak||0, newStreak)
    const newTotalAnswered = (profile?.total_answered||0)+1
    const scoreKey = `score_${quizSubject}`
    const newScore = (profile?.[scoreKey]||0) + (correct?1:0)
    const currentAch = profile?.achievements || []
    const newAch = [...currentAch]
    if (correct && !newAch.includes("first_correct")) newAch.push("first_correct")
    if (newStreak>=5 && !newAch.includes("streak_5")) newAch.push("streak_5")
    if (newStreak>=10 && !newAch.includes("streak_10")) newAch.push("streak_10")
    if (newScore>=10 && !newAch.includes(`${quizSubject}_10`)) newAch.push(`${quizSubject}_10`)
    const profileUpdates = { daily_count:newDailyCount, xp:newXP, streak:newStreak, best_streak:newBestStreak, total_answered:newTotalAnswered, [scoreKey]:newScore, achievements:newAch }
    if (quizIndex < quizQuestions.length-1) {
      setQuizAnswers(newAnswers); setQuizIndex(quizIndex+1)
      setProfile(p=>({...p,...profileUpdates})); await updateProfile(profileUpdates)
    } else {
      const sessionScore = newAnswers.filter(a=>a.correct).length
      if (sessionScore===10 && !newAch.includes("perfect_quiz")) newAch.push("perfect_quiz")
      const quizCount = (profile?.quiz_count||0)+1
      if (quizCount>=10 && !newAch.includes("quiz_10")) newAch.push("quiz_10")
      setQuizAnswers(newAnswers)
      setQuizResults({ answers:newAnswers, questions:quizQuestions, sessionScore, subject:quizSubject })
      setProfile(p=>({...p,...profileUpdates,quiz_count:quizCount,achievements:newAch}))
      await updateProfile({...profileUpdates,quiz_count:quizCount,achievements:newAch})
      await supabase.from("quiz_results").insert({ user_id:user.id, subject:quizSubject, score:sessionScore, total:quizQuestions.length, answers:newAnswers })
      setScreen("results")
    }
  }

  if (loading || screen==="splash") return <SplashScreen />
  if (screen==="auth") return <AuthScreen onAuth={(u,p)=>{setUser(u);setProfile(p);setScreen("home")}} />
  if (screen==="quiz") return <QuizScreen subject={quizSubject} questions={quizQuestions} index={quizIndex} profile={profile} onSubmit={submitAnswer} onBack={()=>setScreen("home")} />
  if (screen==="results") return <ResultsScreen results={quizResults} profile={profile} onHome={()=>setScreen("home")} onRetry={()=>startQuiz(quizSubject)} onExplain={()=>setScreen("explain")} />
  if (screen==="explain") return <ExplainScreen results={quizResults} onBack={()=>setScreen("results")} />
  if (screen==="lessonDetail" && selectedLesson) return <LessonDetailScreen lesson={selectedLesson} profile={profile} onBack={()=>setScreen("lessons")} onRead={async(id)=>{ const nr=profile?.notes_read||[]; if(!nr.includes(id)){ const newNr=[...nr,id]; const newAch=[...(profile?.achievements||[])]; if(newNr.length>=3&&!newAch.includes("notes_reader")) newAch.push("notes_reader"); await updateProfile({notes_read:newNr,achievements:newAch,xp:(profile?.xp||0)+20}) }}} />

  const nav = [
    {id:"home",icon:"🏠",label:"Home"},
    {id:"lessons",icon:"📚",label:"Learn"},
    {id:"community",icon:"💬",label:"Community"},
    {id:"leaderboard",icon:"🏆",label:"Ranks"},
    {id:"profile",icon:"👤",label:"Profile"},
  ]

  return (
    <div style={s.root}>
      <div style={s.topbar}>
        <div>
          <div style={s.brand}>SciTech<span style={s.brandAccent}>Tales</span></div>
          <div style={{fontSize:9,letterSpacing:3,color:C.textDim}}>@scitechtales</div>
        </div>
        <div style={{display:"flex",gap:8,alignItems:"center"}}>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:11,color:C.brand,fontWeight:900}}>LVL {getLevel(profile?.xp||0)}</div>
            <div style={{fontSize:10,color:C.textDim}}>{profile?.xp||0} XP</div>
          </div>
          <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.brand},#a855f7)`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16}}>
            {profile?.full_name?.[0]?.toUpperCase()||"S"}
          </div>
        </div>
      </div>
      <div style={s.wrap}>
        {screen==="home" && <HomeScreen profile={profile} onStartQuiz={startQuiz} onSubscribe={()=>setScreen("subscribe")} />}
        {screen==="lessons" && <LessonsScreen profile={profile} onSelect={(l)=>{setSelectedLesson(l);setScreen("lessonDetail")}} />}
        {screen==="community" && <CommunityScreen user={user} profile={profile} onAchieve={async(id)=>{ const a=profile?.achievements||[]; if(!a.includes(id)) await updateProfile({achievements:[...a,id]}) }} />}
        {screen==="leaderboard" && <LeaderboardScreen profile={profile} />}
        {screen==="profile" && <ProfileScreen profile={profile} onLogout={async()=>{await supabase.auth.signOut()}} onSubscribe={()=>setScreen("subscribe")} />}
        {screen==="subscribe" && <SubscribeScreen onBack={()=>setScreen("home")} onActivate={async()=>{ const expiry=new Date(); expiry.setMonth(expiry.getMonth()+6); await updateProfile({is_subscribed:true,sub_expiry:expiry.toISOString()}); setScreen("home") }} />}
      </div>
      <div style={s.bottomNav}>
        {nav.map(n=>(
          <button key={n.id} onClick={()=>setScreen(n.id)} style={s.navBtn}>
            <span style={{fontSize:20,opacity:screen===n.id?1:0.4}}>{n.icon}</span>
            <span style={{fontSize:9,letterSpacing:1,color:screen===n.id?C.brand:C.textDim,fontWeight:screen===n.id?900:400}}>{n.label.toUpperCase()}</span>
          </button>
        ))}
      </div>
    </div>
  )
}function SplashScreen() {
  return (
    <div style={{...s.root,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh"}}>
      <div style={{fontSize:56,marginBottom:16}}>🧬</div>
      <div style={{fontSize:24,fontWeight:900,letterSpacing:2}}>SciTech<span style={{color:C.brand}}>Tales</span></div>
      <div style={{fontSize:11,color:C.textDim,letterSpacing:4,marginTop:4}}>LOADING...</div>
    </div>
  )
}

function AuthScreen({onAuth}) {
  const [mode,setMode]=useState("login")
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")
  const [name,setName]=useState("")
  const [username,setUsername]=useState("")
  const [error,setError]=useState("")
  const [loading,setLoading]=useState(false)
  const [success,setSuccess]=useState("")

  const handleAuth = async () => {
    setError(""); setLoading(true)
    try {
      if (mode==="signup") {
        const {error:err} = await supabase.auth.signUp({email,password,options:{data:{full_name:name,username:username.toLowerCase().replace(/\s/g,"")}}})
        if (err) throw err
        setSuccess("Account created! Check your email to verify then log in.")
        setMode("login")
      } else {
        const {data,error:err} = await supabase.auth.signInWithPassword({email,password})
        if (err) throw err
        const {data:profile} = await supabase.from("profiles").select("*").eq("id",data.user.id).single()
        onAuth(data.user,profile)
      }
    } catch(e) { setError(e.message) }
    setLoading(false)
  }

  return (
    <div style={{...s.root,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",minHeight:"100vh",padding:"0 20px"}}>
      <div style={{textAlign:"center",marginBottom:32}}>
        <div style={{fontSize:48,marginBottom:8}}>🧬⚗️⚛️</div>
        <div style={{fontSize:26,fontWeight:900,letterSpacing:2}}>SciTech<span style={{color:C.brand}}>Tales</span></div>
        <div style={{fontSize:11,color:C.textDim,letterSpacing:4,marginTop:4}}>JAMB CBT · COMMUNITY · AI SEARCH</div>
      </div>
      <div style={{width:"100%",maxWidth:400}}>
        <div style={{display:"flex",background:C.surface,borderRadius:10,padding:4,marginBottom:20,border:`1px solid ${C.border}`}}>
          {["login","signup"].map(m=>(
            <button key={m} onClick={()=>{setMode(m);setError("");setSuccess("")}}
              style={{flex:1,padding:"10px",borderRadius:8,border:"none",background:mode===m?`linear-gradient(135deg,${C.brand},#a855f7)`:"transparent",color:mode===m?"#fff":C.textMid,fontFamily:font,fontSize:12,fontWeight:900,letterSpacing:2,cursor:"pointer"}}>
              {m.toUpperCase()}
            </button>
          ))}
        </div>
        {success&&<div style={{background:"#052e1650",border:`1px solid ${C.green}`,borderRadius:10,padding:12,marginBottom:12,color:C.green,fontSize:13}}>{success}</div>}
        {error&&<div style={{background:`${C.redDim}80`,border:`1px solid ${C.red}`,borderRadius:10,padding:12,marginBottom:12,color:"#fca5a5",fontSize:13}}>{error}</div>}
        {mode==="signup"&&<>
          <input style={{...s.input,marginBottom:10}} placeholder="Full Name" value={name} onChange={e=>setName(e.target.value)} />
          <input style={{...s.input,marginBottom:10}} placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
        </>}
        <input style={{...s.input,marginBottom:10}} type="email" placeholder="Email address" value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={{...s.input,marginBottom:16}} type="password" placeholder="Password (min 6 chars)" value={password} onChange={e=>setPassword(e.target.value)} />
        <button onClick={handleAuth} disabled={loading} style={{...s.btnPrimary,opacity:loading?0.7:1,marginBottom:10}}>
          {loading?"PLEASE WAIT...":mode==="login"?"LOG IN":"CREATE ACCOUNT"}
        </button>
        <div style={{textAlign:"center",fontSize:12,color:C.textDim,marginTop:8}}>
          {mode==="login"?"No account? ":"Have an account? "}
          <span style={{color:C.brand,cursor:"pointer"}} onClick={()=>{setMode(mode==="login"?"signup":"login");setError("");setSuccess("")}}>
            {mode==="login"?"Sign up free":"Log in"}
          </span>
        </div>
      </div>
    </div>
  )
}

function HomeScreen({profile,onStartQuiz,onSubscribe}) {
  const today=todayKey()
  const todayCount=profile?.daily_count?.[today]||0
  const isSubscribed=profile?.is_subscribed&&profile?.sub_expiry&&new Date(profile.sub_expiry)>new Date()
  const canPlay=isSubscribed||todayCount<DAILY_FREE_LIMIT
  const totalScore=(profile?.score_biology||0)+(profile?.score_chemistry||0)+(profile?.score_physics||0)
  const xp=profile?.xp||0
  const level=getLevel(xp)
  return (
    <div style={{paddingTop:16}}>
      <div style={{marginBottom:20}}>
        <div style={{fontSize:13,color:C.textMid}}>Welcome back,</div>
        <div style={{fontSize:22,fontWeight:900}}>{profile?.full_name||profile?.username||"Student"} 👋</div>
      </div>
      <div style={{...s.cardGlow,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
          <div>
            <div style={{fontSize:10,color:C.brand,letterSpacing:3}}>LEVEL {level}</div>
            <div style={{fontSize:18,fontWeight:900}}>{xp} XP Total</div>
          </div>
          <div style={{textAlign:"right"}}>
            <div style={{fontSize:24}}>🔥</div>
            <div style={{fontSize:14,fontWeight:900,color:C.amber}}>{profile?.streak||0} streak</div>
          </div>
        </div>
        <div style={s.progBg}>
          <div style={{...s.progFill,width:`${xp%100}%`,background:`linear-gradient(90deg,${C.brand},#a855f7)`}} />
        </div>
        <div style={{fontSize:10,color:C.textDim,marginTop:4}}>{getXPToNext(xp)} XP to Level {level+1}</div>
      </div>
      {!isSubscribed&&(
        <div style={{...s.card,borderColor:todayCount>=DAILY_FREE_LIMIT?`${C.amber}40`:"transparent",marginBottom:16}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div>
              <div style={{fontSize:12,color:C.textMid}}>Daily Questions</div>
              <div style={{fontSize:18,fontWeight:900}}>{todayCount} <span style={{color:C.textDim}}>/ {DAILY_FREE_LIMIT}</span></div>
            </div>
            {todayCount>=DAILY_FREE_LIMIT
              ?<button onClick={onSubscribe} style={{background:`linear-gradient(135deg,${C.amber},#fbbf24)`,border:"none",borderRadius:20,padding:"8px 16px",color:"#000",fontFamily:font,fontSize:11,fontWeight:900,cursor:"pointer"}}>UPGRADE $1 →</button>
              :<span style={{...s.pill,background:`${C.green}20`,color:C.green}}>{DAILY_FREE_LIMIT-todayCount} LEFT</span>
            }
          </div>
        </div>
      )}
      {isSubscribed&&<div style={{...s.card,borderColor:`${C.green}40`,marginBottom:16}}><div style={{color:C.green,fontSize:13,fontWeight:900}}>✅ PRO ACTIVE — Unlimited Questions</div></div>}
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {[{label:"Total Score",val:totalScore,icon:"🏆"},{label:"Questions",val:profile?.total_answered||0,icon:"📝"},{label:"Best Streak",val:profile?.best_streak||0,icon:"💥"}].map((stat,i)=>(
          <div key={i} style={{flex:1,...s.card,textAlign:"center",padding:12}}>
            <div style={{fontSize:18}}>{stat.icon}</div>
            <div style={{fontSize:20,fontWeight:900}}>{stat.val}</div>
            <div style={{fontSize:9,color:C.textDim,letterSpacing:1}}>{stat.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:12}}>Start A Quiz</div>
      <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
        {SUBJECTS.map(subj=>{
          const score=profile?.[`score_${subj.id}`]||0
          return (
            <button key={subj.id} onClick={()=>canPlay?onStartQuiz(subj.id):onSubscribe()}
              style={{display:"flex",alignItems:"center",gap:16,padding:"16px",borderRadius:14,border:`1px solid ${subj.color}30`,background:`${subj.color}08`,cursor:"pointer",fontFamily:font,textAlign:"left"}}>
              <span style={{fontSize:32}}>{subj.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontSize:16,fontWeight:900,color:C.text}}>{subj.label}</div>
                <div style={{fontSize:11,color:C.textMid,marginTop:2}}>{canPlay?`10 questions · ${score} pts earned`:"Limit reached — upgrade to continue"}</div>
              </div>
              <span style={{...s.pill,background:`${subj.color}20`,color:subj.color}}>{canPlay?"PLAY →":"🔒"}</span>
            </button>
          )
        })}
      </div>
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:12}}>Your Progress</div>
      {SUBJECTS.map(subj=>{
        const score=profile?.[`score_${subj.id}`]||0
        const pct=Math.min(100,Math.round((score/(QUESTION_BANK[subj.id].length*10))*100))
        return (
          <div key={subj.id} style={{...s.card,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontWeight:900}}>{subj.icon} {subj.label}</span>
              <span style={{color:subj.color,fontWeight:900}}>{score} pts</span>
            </div>
            <div style={s.progBg}><div style={{...s.progFill,width:`${pct}%`,background:`linear-gradient(90deg,${subj.color},${subj.accent})`}} /></div>
          </div>
        )
      })}
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginTop:20,marginBottom:12}}>Achievements ({(profile?.achievements||[]).length}/{ACHIEVEMENTS.length})</div>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
        {ACHIEVEMENTS.map(a=>{
          const earned=(profile?.achievements||[]).includes(a.id)
          return (
            <div key={a.id} style={{flex:"0 0 calc(25% - 6px)",background:C.surface,border:`1px solid ${earned?C.brand+"40":C.border}`,borderRadius:10,padding:"10px 6px",textAlign:"center",opacity:earned?1:0.3}}>
              <div style={{fontSize:22}}>{a.icon}</div>
              <div style={{fontSize:9,color:C.textDim,letterSpacing:1,marginTop:2}}>{a.title.toUpperCase()}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function QuizScreen({subject,questions,index,profile,onSubmit,onBack}) {
  const [selected,setSelected]=useState(null)
  const [revealed,setRevealed]=useState(false)
  const [timeLeft,setTimeLeft]=useState(30)
  const timerRef=useRef(null)
  const subj=SUBJECTS.find(s=>s.id===subject)
  const q=questions[index]
  const diffColor={easy:C.green,medium:C.amber,hard:C.red}

  useEffect(()=>{setSelected(null);setRevealed(false);setTimeLeft(30)},[index])
  useEffect(()=>{
    if(revealed){clearInterval(timerRef.current);return}
    timerRef.current=setInterval(()=>{
      setTimeLeft(t=>{
        if(t<=1){clearInterval(timerRef.current);handleSubmit(null);return 0}
        return t-1
      })
    },1000)
    return()=>clearInterval(timerRef.current)
  },[index,revealed])

  const handleSubmit=(sel)=>{
    if(revealed)return
    const s=sel!==undefined?sel:selected
    setRevealed(true); clearInterval(timerRef.current)
    setTimeout(()=>onSubmit(s===null?-1:s),1500)
  }

  if(!q)return null
  return (
    <div style={{...s.root,minHeight:"100vh"}}>
      <div style={{maxWidth:600,margin:"0 auto",padding:"0 16px 30px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0"}}>
          <button onClick={onBack} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",color:C.textMid,fontFamily:font,fontSize:14}}>←</button>
          <div style={{flex:1}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:5}}>
              <span style={{fontSize:11,color:C.textDim,letterSpacing:2}}>Q {index+1} / {questions.length}</span>
              <span style={{fontSize:12,fontWeight:900,color:timeLeft<=5?C.red:C.textMid}}>⏱ {timeLeft}s</span>
            </div>
            <div style={s.progBg}><div style={{...s.progFill,width:`${(index/questions.length)*100}%`,background:`linear-gradient(90deg,${subj.color},${subj.accent})`}} /></div>
          </div>
          <div style={{fontSize:16,color:C.amber,fontWeight:900}}>🔥{profile?.streak||0}</div>
        </div>
        <div style={{height:3,background:C.surface2,borderRadius:2,marginBottom:16,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${(timeLeft/30)*100}%`,background:timeLeft>10?`linear-gradient(90deg,${subj.color},${subj.accent})`:`linear-gradient(90deg,${C.red},#f87171)`,transition:"width 1s linear"}} />
        </div>
        <div style={{...s.card,border:`1px solid ${subj.color}30`,marginBottom:16}}>
          <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap"}}>
            <span style={{...s.pill,background:`${subj.color}20`,color:subj.color}}>{subj.icon} {q.topic}</span>
            <span style={{...s.pill,background:`${diffColor[q.difficulty]}20`,color:diffColor[q.difficulty]}}>{q.difficulty.toUpperCase()}</span>
          </div>
          <div style={{fontSize:17,fontWeight:900,lineHeight:1.6}}>{q.q}</div>
        </div>
        <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:16}}>
          {q.options.map((opt,i)=>{
            const isSel=selected===i
            const isCorrect=i===q.answer
            let border=C.border,bg=C.surface,color=C.text
            if(revealed){
              if(isCorrect){border=C.green;bg=`${C.greenDim}80`;color="#4ade80"}
              else if(isSel){border=C.red;bg=`${C.redDim}80`;color="#f87171"}
            } else if(isSel){border=subj.color;bg=`${subj.color}18`;color=subj.accent}
            return (
              <button key={i} onClick={()=>!revealed&&setSelected(i)}
                style={{display:"flex",alignItems:"center",gap:12,padding:"14px 16px",borderRadius:12,border:`1px solid ${border}`,background:bg,cursor:revealed?"default":"pointer",fontFamily:font,textAlign:"left",width:"100%"}}>
                <span style={{width:30,height:30,borderRadius:"50%",border:`2px solid ${border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:900,flexShrink:0,color}}>
                  {revealed&&isCorrect?"✓":revealed&&isSel&&!isCorrect?"✗":String.fromCharCode(65+i)}
                </span>
                <span style={{fontSize:15,fontWeight:900,flex:1,lineHeight:1.4,color}}>{opt}</span>
              </button>
            )
          })}
        </div>
        <button onClick={()=>handleSubmit(selected)} disabled={selected===null||revealed}
          style={{...s.btnPrimary,background:selected!==null&&!revealed?`linear-gradient(135deg,${subj.color},${subj.accent})`:C.surface2,color:selected!==null&&!revealed?"#000":C.textDim,cursor:selected!==null&&!revealed?"pointer":"not-allowed"}}>
          {revealed?"LOADING NEXT...":"CONFIRM ANSWER"}
        </button>
      </div>
    </div>
  )
}

function ResultsScreen({results,profile,onHome,onRetry,onExplain}) {
  if(!results)return null
  const {sessionScore,questions,subject}=results
  const subj=SUBJECTS.find(s=>s.id===subject)
  const pct=Math.round((sessionScore/questions.length)*100)
  const grade=pct>=90?"A+":pct>=80?"A":pct>=70?"B":pct>=60?"C":pct>=50?"D":"F"
  const gradeColor=pct>=70?C.green:pct>=50?C.amber:C.red
  return (
    <div style={{...s.root,minHeight:"100vh"}}>
      <div style={{maxWidth:600,margin:"0 auto",padding:"30px 16px"}}>
        <div style={{textAlign:"center",marginBottom:24}}>
          <div style={{fontSize:56}}>{pct>=70?"🎉":pct>=50?"💪":"📖"}</div>
          <div style={{fontSize:11,color:C.textDim,letterSpacing:4,marginBottom:8}}>QUIZ COMPLETE</div>
          <div style={{fontSize:80,fontWeight:900,color:gradeColor,lineHeight:1}}>{grade}</div>
          <div style={{fontSize:18,color:C.textMid}}>{sessionScore}/{questions.length} correct · {pct}%</div>
          <div style={{fontSize:13,color:C.brand,marginTop:4}}>+{sessionScore*10+(questions.length-sessionScore)*2} XP earned</div>
        </div>
        <div style={{...s.progBg,height:6,marginBottom:24}}>
          <div style={{...s.progFill,height:6,width:`${pct}%`,background:`linear-gradient(90deg,${subj.color},${subj.accent})`}} />
        </div>
        <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:10}}>Answer Summary</div>
        <div style={{display:"flex",flexDirection:"column",gap:6,marginBottom:20}}>
          {questions.map((q,i)=>{
            const ans=results.answers[i]
            return (
              <div key={q.id} style={{display:"flex",alignItems:"center",gap:10,padding:"10px 14px",borderRadius:10,border:`1px solid ${ans?.correct?C.green+"30":C.red+"30"}`,background:ans?.correct?`${C.greenDim}30`:`${C.redDim}30`}}>
                <span style={{fontSize:16,color:ans?.correct?C.green:C.red}}>{ans?.correct?"✓":"✗"}</span>
                <span style={{fontSize:12,color:C.textMid,flex:1}}>{q.q.slice(0,50)}...</span>
              </div>
            )
          })}
        </div>
        <button onClick={onExplain} style={{...s.btnPrimary,marginBottom:10}}>📖 VIEW FULL EXPLANATIONS</button>
        <button onClick={onRetry} style={{...s.btnOutline,marginBottom:10}}>🔁 RETRY QUIZ</button>
        <button onClick={onHome} style={s.btnOutline}>← BACK TO HOME</button>
      </div>
    </div>
  )
}
function ExplainScreen({results,onBack}) {
  const [open,setOpen]=useState(null)
  if(!results)return null
  const subj=SUBJECTS.find(s=>s.id===results.subject)
  return (
    <div style={{...s.root,minHeight:"100vh"}}>
      <div style={{maxWidth:600,margin:"0 auto",padding:"0 16px 30px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0 20px"}}>
          <button onClick={onBack} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",color:C.textMid,fontFamily:font}}>←</button>
          <div>
            <div style={{fontSize:10,color:C.brand,letterSpacing:3}}>EXPLANATIONS</div>
            <div style={{fontWeight:900,fontSize:16}}>Full Answer Breakdown</div>
          </div>
        </div>
        {results.questions.map((q,i)=>{
          const ans=results.answers[i]
          const isOpen=open===i
          return (
            <div key={q.id} style={{...s.card,border:`1px solid ${ans?.correct?C.green+"30":C.red+"30"}`,marginBottom:10}}>
              <div style={{display:"flex",gap:10,cursor:"pointer"}} onClick={()=>setOpen(isOpen?null:i)}>
                <span style={{fontSize:20,color:ans?.correct?C.green:C.red,flexShrink:0}}>{ans?.correct?"✅":"❌"}</span>
                <div style={{flex:1}}>
                  <div style={{fontSize:13,fontWeight:900,lineHeight:1.5}}>{q.q}</div>
                  <div style={{fontSize:11,color:C.green,marginTop:4}}>✓ {q.options[q.answer]}</div>
                  {!ans?.correct&&ans?.selected>=0&&<div style={{fontSize:11,color:C.red}}>✗ You chose: {q.options[ans.selected]}</div>}
                </div>
                <span style={{color:C.textDim,fontSize:16}}>{isOpen?"▲":"▼"}</span>
              </div>
              {isOpen&&(
                <div style={{marginTop:14,padding:"14px",background:C.surface2,borderRadius:8,fontSize:13,color:C.textMid,lineHeight:1.8,borderLeft:`3px solid ${subj.color}`}}>
                  {q.explanation}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function LessonsScreen({profile,onSelect}) {
  const [activeSubject,setActiveSubject]=useState("biology")
  const lessons=LESSON_CONTENT[activeSubject]
  const notesRead=profile?.notes_read||[]
  const subj=SUBJECTS.find(s=>s.id===activeSubject)
  return (
    <div style={{paddingTop:16}}>
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:4}}>Study Material</div>
      <div style={{fontSize:20,fontWeight:900,marginBottom:16}}>Lesson Notes 📚</div>
      <div style={{display:"flex",gap:8,marginBottom:20}}>
        {SUBJECTS.map(s=>(
          <button key={s.id} onClick={()=>setActiveSubject(s.id)}
            style={{flex:1,padding:"10px 4px",borderRadius:10,border:`1px solid ${activeSubject===s.id?s.color:C.border}`,background:activeSubject===s.id?`${s.color}18`:C.surface,color:activeSubject===s.id?s.color:C.textMid,cursor:"pointer",fontSize:12,fontFamily:font,fontWeight:900}}>
            {s.icon} {s.label}
          </button>
        ))}
      </div>
      <div style={{...s.card,marginBottom:16}}>
        <div style={{display:"flex",justifyContent:"space-between"}}>
          <span style={{fontSize:12,color:C.textMid}}>Notes completed</span>
          <span style={{fontSize:12,color:C.brand,fontWeight:900}}>{lessons.filter(l=>notesRead.includes(l.id)).length}/{lessons.length}</span>
        </div>
      </div>
      {lessons.map(lesson=>{
        const read=notesRead.includes(lesson.id)
        return (
          <button key={lesson.id} onClick={()=>onSelect(lesson)}
            style={{display:"flex",alignItems:"center",gap:14,padding:16,borderRadius:14,width:"100%",border:`1px solid ${read?subj.color+"50":C.border}`,background:read?`${subj.color}08`:C.surface,cursor:"pointer",fontFamily:font,textAlign:"left",marginBottom:10,boxSizing:"border-box"}}>
            <div style={{fontSize:36,flexShrink:0}}>{lesson.icon}</div>
            <div style={{flex:1}}>
              <div style={{fontSize:10,color:subj.color,letterSpacing:2,marginBottom:2}}>{lesson.topic.toUpperCase()}</div>
              <div style={{fontSize:15,fontWeight:900,color:C.text}}>{lesson.title}</div>
              <div style={{fontSize:11,color:C.textDim,marginTop:3}}>📖 {lesson.duration} · {lesson.difficulty}</div>
            </div>
            <div style={{color:read?subj.color:C.textDim,fontSize:20}}>{read?"✓":"›"}</div>
          </button>
        )
      })}
    </div>
  )
}

function LessonDetailScreen({lesson,profile,onBack,onRead}) {
  const [readSections,setReadSections]=useState([])
  const [openSection,setOpenSection]=useState(0)
  const allRead=readSections.length>=lesson.sections.length
  const subjId=Object.keys(LESSON_CONTENT).find(k=>LESSON_CONTENT[k].some(l=>l.id===lesson.id))
  const subj=SUBJECTS.find(s=>s.id===subjId)
  useEffect(()=>{if(allRead)onRead(lesson.id)},[allRead])
  return (
    <div style={{...s.root,minHeight:"100vh"}}>
      <div style={{maxWidth:600,margin:"0 auto",padding:"0 16px 30px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0 20px"}}>
          <button onClick={onBack} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",color:C.textMid,fontFamily:font}}>←</button>
          <div>
            <div style={{fontSize:10,color:subj?.color,letterSpacing:3}}>{lesson.topic.toUpperCase()}</div>
            <div style={{fontSize:16,fontWeight:900}}>{lesson.title}</div>
          </div>
        </div>
        <div style={{...s.progBg,marginBottom:20}}>
          <div style={{...s.progFill,width:`${(readSections.length/lesson.sections.length)*100}%`,background:`linear-gradient(90deg,${subj?.color},${subj?.accent})`}} />
        </div>
        {lesson.sections.map((sec,i)=>{
          const read=readSections.includes(i)
          const isOpen=openSection===i
          return (
            <div key={i} style={{...s.card,border:`1px solid ${read?subj?.color+"40":C.border}`,marginBottom:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",marginBottom:isOpen?12:0}}
                onClick={()=>{setOpenSection(isOpen?null:i);if(!read)setReadSections(prev=>[...prev,i])}}>
                <div style={{fontWeight:900,color:read?subj?.color:C.text,fontSize:14}}>{sec.heading}</div>
                <div style={{color:read?subj?.color:C.textDim,fontSize:16}}>{isOpen?"▲":"▼"}</div>
              </div>
              {isOpen&&<div style={{fontSize:13,color:C.textMid,lineHeight:1.9,whiteSpace:"pre-line",borderTop:`1px solid ${C.border}`,paddingTop:12}}>{sec.body}</div>}
            </div>
          )
        })}
        {allRead&&(
          <div style={{background:`${subj?.color}18`,border:`1px solid ${subj?.color}`,borderRadius:12,padding:16,textAlign:"center",marginTop:8}}>
            <div style={{fontSize:28,marginBottom:4}}>🎉</div>
            <div style={{color:subj?.color,fontWeight:900}}>Topic Complete! +20 XP earned</div>
          </div>
        )}
      </div>
    </div>
  )
}

function CommunityScreen({user,profile,onAchieve}) {
  const [posts,setPosts]=useState([])
  const [newPost,setNewPost]=useState("")
  const [postSubject,setPostSubject]=useState("general")
  const [loading,setLoading]=useState(false)
  const [aiQuery,setAiQuery]=useState("")
  const [aiAnswer,setAiAnswer]=useState("")
  const [aiLoading,setAiLoading]=useState(false)

  useEffect(()=>{loadPosts()},[])

  const loadPosts=async()=>{
    const {data}=await supabase.from("posts").select(`*, profiles(username,full_name,xp)`).order("created_at",{ascending:false}).limit(20)
    if(data)setPosts(data)
  }

  const submitPost=async()=>{
    if(!newPost.trim())return
    setLoading(true)
    await supabase.from("posts").insert({user_id:user.id,content:newPost,subject:postSubject})
    setNewPost(""); await loadPosts(); await onAchieve("social_post")
    setLoading(false)
  }

  const likePost=async(post)=>{
    await supabase.from("likes").insert({post_id:post.id,user_id:user.id}).then(()=>{})
    await supabase.from("posts").update({likes:post.likes+1}).eq("id",post.id)
    loadPosts()
  }

  const askAI=async()=>{
    if(!aiQuery.trim())return
    setAiLoading(true); setAiAnswer("")
    try {
      const res=await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-20250514",
          max_tokens:1000,
          system:"You are a helpful science tutor for SciTechTales, a Nigerian JAMB exam prep platform. Answer Biology, Chemistry and Physics questions clearly for secondary school students. Keep answers concise and mention JAMB context where relevant.",
          messages:[{role:"user",content:aiQuery}]
        })
      })
      const data=await res.json()
      if(data.content?.[0]?.text) setAiAnswer(data.content[0].text)
      else setAiAnswer("AI search requires an Anthropic API key. Add it to your account to unlock this feature.")
    } catch { setAiAnswer("AI search is coming soon! Add your Anthropic API key to activate it.") }
    setAiLoading(false)
  }

  const subjectColors={biology:C.green,chemistry:C.amber,physics:C.blue,general:C.brand}
  return (
    <div style={{paddingTop:16}}>
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:4}}>Community</div>
      <div style={{fontSize:20,fontWeight:900,marginBottom:16}}>Science Hub 💬</div>
      <div style={{...s.cardGlow,marginBottom:20}}>
        <div style={{fontSize:11,color:C.brand,letterSpacing:3,marginBottom:8}}>🤖 AI SCIENCE TUTOR</div>
        <div style={{display:"flex",gap:8}}>
          <input style={{...s.input,flex:1}} placeholder="Ask anything... e.g. Explain osmosis" value={aiQuery} onChange={e=>setAiQuery(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askAI()} />
          <button onClick={askAI} disabled={aiLoading} style={{padding:"14px 16px",borderRadius:10,border:"none",background:`linear-gradient(135deg,${C.brand},#a855f7)`,color:"#fff",cursor:"pointer",fontFamily:font,fontWeight:900,fontSize:13,flexShrink:0}}>
            {aiLoading?"...":"ASK"}
          </button>
        </div>
        {aiAnswer&&<div style={{marginTop:12,padding:14,background:C.surface2,borderRadius:8,fontSize:13,color:C.textMid,lineHeight:1.8,borderLeft:`3px solid ${C.brand}`,whiteSpace:"pre-wrap"}}>{aiAnswer}</div>}
      </div>
      <div style={{...s.card,marginBottom:20}}>
        <div style={{fontSize:11,color:C.textDim,letterSpacing:2,marginBottom:10}}>SHARE WITH THE COMMUNITY</div>
        <textarea style={{...s.input,height:80,resize:"none",marginBottom:10}} placeholder="Ask a question, share a tip, post a note..." value={newPost} onChange={e=>setNewPost(e.target.value)} />
        <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
          {["general","biology","chemistry","physics"].map(t=>(
            <button key={t} onClick={()=>setPostSubject(t)}
              style={{padding:"5px 12px",borderRadius:20,border:`1px solid ${postSubject===t?subjectColors[t]:C.border}`,background:postSubject===t?`${subjectColors[t]}20`:"transparent",color:postSubject===t?subjectColors[t]:C.textDim,cursor:"pointer",fontFamily:font,fontSize:11,fontWeight:900}}>
              {t.charAt(0).toUpperCase()+t.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={submitPost} disabled={loading||!newPost.trim()} style={{...s.btnPrimary,opacity:loading||!newPost.trim()?0.5:1}}>
          {loading?"POSTING...":"POST"}
        </button>
      </div>
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:12}}>RECENT POSTS</div>
      {posts.length===0&&(
        <div style={{textAlign:"center",padding:30,color:C.textDim}}>
          <div style={{fontSize:32,marginBottom:8}}>💬</div>
          <div>Be the first to post in the community!</div>
        </div>
      )}
      {posts.map(post=>{
        const tagColor=subjectColors[post.subject]||C.brand
        return (
          <div key={post.id} style={{...s.card,marginBottom:10}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}>
              <div style={{width:36,height:36,borderRadius:"50%",background:`linear-gradient(135deg,${C.brand},#a855f7)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:14,flexShrink:0}}>
                {(post.profiles?.full_name||post.profiles?.username||"?")[0].toUpperCase()}
              </div>
              <div>
                <div style={{fontWeight:900,fontSize:13}}>{post.profiles?.full_name||post.profiles?.username}</div>
                <div style={{fontSize:10,color:C.textDim}}>LVL {getLevel(post.profiles?.xp||0)} · {new Date(post.created_at).toLocaleDateString()}</div>
              </div>
              {post.subject&&post.subject!=="general"&&<span style={{...s.pill,background:`${tagColor}20`,color:tagColor,marginLeft:"auto"}}>{post.subject.toUpperCase()}</span>}
            </div>
            <div style={{fontSize:14,lineHeight:1.7,color:C.textMid,marginBottom:10}}>{post.content}</div>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <button onClick={()=>likePost(post)} style={{background:"none",border:"none",cursor:"pointer",color:C.textDim,fontFamily:font,fontSize:12,display:"flex",alignItems:"center",gap:4}}>
                ❤️ {post.likes||0}
              </button>
              {post.user_id===user?.id&&(
                <button onClick={async()=>{await supabase.from("posts").delete().eq("id",post.id);loadPosts()}} style={{background:"none",border:"none",cursor:"pointer",color:C.textDim,fontFamily:font,fontSize:11}}>
                  🗑 Delete
                </button>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function LeaderboardScreen({profile}) {
  const [leaders,setLeaders]=useState([])
  useEffect(()=>{
    supabase.from("leaderboard").select("*").then(({data})=>{if(data)setLeaders(data)})
  },[])
  const medals=["🥇","🥈","🥉"]
  return (
    <div style={{paddingTop:16}}>
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:4}}>Rankings</div>
      <div style={{fontSize:20,fontWeight:900,marginBottom:16}}>Leaderboard 🏆</div>
      {profile&&(
        <div style={{...s.cardGlow,marginBottom:20}}>
          <div style={{fontSize:11,color:C.brand,letterSpacing:3,marginBottom:8}}>YOUR STATS</div>
          <div style={{display:"flex",justifyContent:"space-around"}}>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900}}>{profile.xp}</div><div style={{fontSize:10,color:C.textDim}}>XP</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900}}>LVL {getLevel(profile.xp||0)}</div><div style={{fontSize:10,color:C.textDim}}>LEVEL</div></div>
            <div style={{textAlign:"center"}}><div style={{fontSize:22,fontWeight:900}}>{(profile.score_biology||0)+(profile.score_chemistry||0)+(profile.score_physics||0)}</div><div style={{fontSize:10,color:C.textDim}}>SCORE</div></div>
          </div>
        </div>
      )}
      {leaders.length===0&&(
        <div style={{textAlign:"center",padding:40,color:C.textDim}}>
          <div style={{fontSize:40,marginBottom:8}}>🏆</div>
          <div>Complete quizzes to appear here!</div>
        </div>
      )}
      {leaders.map((leader,i)=>{
        const isMe=leader.id===profile?.id
        return (
          <div key={leader.id} style={{...s.card,border:`1px solid ${isMe?C.brand+"50":C.border}`,background:isMe?`${C.brand}08`:C.surface,marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <div style={{fontSize:24,width:36,textAlign:"center"}}>{medals[i]||`#${i+1}`}</div>
              <div style={{width:38,height:38,borderRadius:"50%",background:`linear-gradient(135deg,${C.brand},#a855f7)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:16}}>
                {(leader.full_name||leader.username||"?")[0].toUpperCase()}
              </div>
              <div style={{flex:1}}>
                <div style={{fontWeight:900,fontSize:14}}>{leader.full_name||leader.username} {isMe?"(You)":""}</div>
                <div style={{fontSize:11,color:C.textDim}}>LVL {getLevel(leader.xp||0)} · {leader.total_score||0} pts</div>
              </div>
              <div style={{textAlign:"right"}}>
                <div style={{fontSize:18,fontWeight:900,color:C.brand}}>{leader.xp}</div>
                <div style={{fontSize:10,color:C.textDim}}>XP</div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

function ProfileScreen({profile,onLogout,onSubscribe}) {
  const isSubscribed=profile?.is_subscribed&&profile?.sub_expiry&&new Date(profile.sub_expiry)>new Date()
  const totalScore=(profile?.score_biology||0)+(profile?.score_chemistry||0)+(profile?.score_physics||0)
  return (
    <div style={{paddingTop:16}}>
      <div style={{textAlign:"center",marginBottom:20}}>
        <div style={{width:72,height:72,borderRadius:"50%",background:`linear-gradient(135deg,${C.brand},#a855f7)`,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:28,margin:"0 auto 12px"}}>
          {(profile?.full_name||profile?.username||"S")[0].toUpperCase()}
        </div>
        <div style={{fontSize:20,fontWeight:900}}>{profile?.full_name||"Student"}</div>
        <div style={{fontSize:12,color:C.textDim}}>@{profile?.username}</div>
        <div style={{fontSize:11,color:C.brand,letterSpacing:2,marginTop:4}}>LEVEL {getLevel(profile?.xp||0)} · {profile?.xp||0} XP</div>
      </div>
      {isSubscribed
        ?<div style={{...s.card,borderColor:`${C.green}40`,background:`${C.greenDim}30`,marginBottom:16,textAlign:"center"}}><div style={{color:C.green,fontWeight:900}}>✅ PRO MEMBER ACTIVE</div><div style={{fontSize:11,color:C.textDim,marginTop:4}}>Expires: {new Date(profile.sub_expiry).toLocaleDateString()}</div></div>
        :<button onClick={onSubscribe} style={{...s.btnPrimary,marginBottom:16}}>⚡ UPGRADE TO PRO — $1 / 6 MONTHS</button>
      }
      <div style={{display:"flex",gap:8,marginBottom:16}}>
        {[{label:"Total Score",val:totalScore},{label:"Questions",val:profile?.total_answered||0},{label:"Best Streak",val:`${profile?.best_streak||0}🔥`}].map((stat,i)=>(
          <div key={i} style={{flex:1,...s.card,textAlign:"center",padding:12}}>
            <div style={{fontSize:18,fontWeight:900}}>{stat.val}</div>
            <div style={{fontSize:9,color:C.textDim,letterSpacing:1}}>{stat.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginBottom:10}}>Subject Scores</div>
      {SUBJECTS.map(subj=>{
        const score=profile?.[`score_${subj.id}`]||0
        return (
          <div key={subj.id} style={{...s.card,marginBottom:8}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontWeight:900}}>{subj.icon} {subj.label}</span>
              <span style={{color:subj.color,fontWeight:900}}>{score} pts</span>
            </div>
            <div style={s.progBg}><div style={{...s.progFill,width:`${Math.min(100,score)}%`,background:`linear-gradient(90deg,${subj.color},${subj.accent})`}} /></div>
          </div>
        )
      })}
      <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginTop:16,marginBottom:10}}>Achievements ({(profile?.achievements||[]).length}/{ACHIEVEMENTS.length})</div>
      {ACHIEVEMENTS.map(a=>{
        const earned=(profile?.achievements||[]).includes(a.id)
        return (
          <div key={a.id} style={{...s.card,opacity:earned?1:0.35,borderColor:earned?`${C.brand}40`:C.border,marginBottom:8}}>
            <div style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:28}}>{a.icon}</span>
              <div><div style={{fontWeight:900,fontSize:14}}>{a.title}</div><div style={{fontSize:11,color:C.textDim}}>{a.desc}</div></div>
              {earned&&<span style={{marginLeft:"auto",color:C.brand,fontSize:18}}>✓</span>}
            </div>
          </div>
        )
      })}
      <button onClick={onLogout} style={{...s.btnOutline,marginTop:16,marginBottom:20,color:C.red,borderColor:`${C.red}40`}}>🚪 LOG OUT</button>
    </div>
  )
}

function SubscribeScreen({onBack,onActivate}) {
  const gateways=[
    {name:"Paystack",desc:"Nigeria · Africa · Card & Bank Transfer",icon:"🌍",color:C.green,link:"https://paystack.com/pay/YOUR_LINK"},
    {name:"Stripe",desc:"International · 135+ currencies · Card",icon:"💳",color:C.blue,link:"https://buy.stripe.com/YOUR_LINK"},
    {name:"Flutterwave",desc:"Pan-Africa and Global payments",icon:"🦋",color:C.amber,link:"https://flutterwave.com/pay/YOUR_LINK"},
  ]
  return (
    <div style={{...s.root,minHeight:"100vh"}}>
      <div style={{maxWidth:600,margin:"0 auto",padding:"0 16px 30px"}}>
        <div style={{display:"flex",alignItems:"center",gap:12,padding:"14px 0 20px"}}>
          <button onClick={onBack} style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:8,padding:"8px 12px",cursor:"pointer",color:C.textMid,fontFamily:font}}>←</button>
          <div style={{fontWeight:900,fontSize:18}}>Upgrade to PRO</div>
        </div>
        <div style={{textAlign:"center",padding:"24px",background:`linear-gradient(135deg,${C.surface},#1a0f2e)`,borderRadius:16,marginBottom:20,border:`1px solid ${C.brand}40`}}>
          <div style={{fontSize:48,marginBottom:8}}>⚡</div>
          <div style={{fontSize:40,fontWeight:900}}><span style={{color:C.amber}}>$1</span> / 6 months</div>
          <div style={{fontSize:12,color:C.textDim,marginTop:4}}>Less than $0.17 per month</div>
        </div>
        {["Unlimited daily questions","Full answer explanations","All lesson notes","AI Science Tutor","Leaderboard access","No ads ever"].map((f,i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 14px",background:C.surface,borderRadius:8,border:`1px solid ${C.border}`,marginBottom:8}}>
            <span style={{color:C.green,fontSize:18}}>✓</span>
            <span style={{fontSize:14,fontWeight:900}}>{f}</span>
          </div>
        ))}
        <div style={{fontSize:10,letterSpacing:4,color:C.brand,textTransform:"uppercase",marginTop:20,marginBottom:12}}>Choose Payment</div>
        {gateways.map(g=>(
          <a key={g.name} href={g.link} target="_blank" rel="noopener noreferrer"
            style={{display:"flex",alignItems:"center",gap:14,padding:16,borderRadius:12,border:`1px solid ${g.color}40`,background:C.surface,textDecoration:"none",marginBottom:10,boxSizing:"border-box"}}>
            <span style={{fontSize:28}}>{g.icon}</span>
            <div style={{flex:1}}>
              <div style={{fontWeight:900,color:C.text,fontSize:15}}>{g.name}</div>
              <div style={{fontSize:12,color:C.textDim}}>{g.desc}</div>
            </div>
            <span style={{color:g.color,fontSize:20}}>→</span>
          </a>
        ))}
        <div style={{marginTop:16,padding:14,background:C.surface2,borderRadius:10,border:`1px solid ${C.border}`}}>
          <div style={{fontSize:11,color:C.textDim,marginBottom:10}}>DEVELOPER NOTE: Remove demo button in production. Use payment webhook to auto-activate.</div>
          <button onClick={onActivate} style={{...s.btnPrimary,background:`linear-gradient(135deg,${C.green},#4ade80)`,color:"#000"}}>
            ✅ ACTIVATE PRO (DEMO MODE)
          </button>
        </div>
        <div style={{height:30}} />
      </div>
    </div>
  )
}
