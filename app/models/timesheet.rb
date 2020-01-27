class Timesheet < ApplicationRecord
	belongs_to :user
	
	def set_sessions arr, task_id, user_id
		sessions_ids = []
		arr.each do |a|
			time = a.split(':')
			minutes = time[0].to_i * 60 + time[1].to_i
			t = Task.find(task_id)
			s = minutes > 0 ? t.sessions.create(user_id: user_id, total_minutes: minutes) : nil
			sessions_ids.push(
				s.id
			)
		end
		return self.update(session_ids: sessions_ids)
	end

	def get_array
		arr = []
		total_minutes = 0
		self.session_ids.each do |i|
			unless i
				arr.push({task_title: "none", time: "0:00"})
			else
				session = Session.find(i)
				task_title = session.task_name
				total_minutes += session.total_minutes
				hours = (session.total_minutes / 60).truncate
				minutes = session.total_minutes % 60
				m_str = minutes.to_s
				if minutes < 10
					m_str = "0"+m_str
				end
				time = hours.to_s + ":" + m_str
				arr.push({task_title: task_title, time: time})
			end
		end
		total_hours = (total_minutes / 60).truncate
		minutes = total_minutes % 60
		m_str = minutes.to_s
		if minutes < 10
			m_str = "0"+m_str
		end
		time = total_hours.to_s + ":" + m_str
		arr.push({time:time})
		arr
	end

end
