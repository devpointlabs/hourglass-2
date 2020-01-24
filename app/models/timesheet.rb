class Timesheet < ApplicationRecord
	belongs_to :user
	
	def set_sessions arr, task_id
		sessions_ids = []
		arr.each do |a|
			time = a.split(':')
			minutes = time[0].to_i * 60 + time[1].to_i
			sessions_ids.push(
				Task.find(task_id).sessions.create(total_minutes: minutes).id
			)
		end
		return self.update(session_ids: sessions_ids)
	end

	def get_array
		arr = []
		total_minutes = 0
		self.sessions_ids.each do |i|
			session = Session.find(i)
			task_title = session.task_name
			total_minutes += session.total_minutes
			hours = (session.total_minutes / 60).truncate
			minutes = session.total_minutes % 60
			arr.push({task_title: task_title, hours: hours, minutes: minutes})
		end
		total_hours = (total_minutes / 60).truncate
		minutes = total_minutes % 60
		arr.push({hours: total_hours, minutes: minutes})
		arr
	end

end
