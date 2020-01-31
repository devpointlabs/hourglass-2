class Api::TimesheetsController < ApplicationController
  before_action :authenticate_user!
	before_action :set_timesheet, only: [:show, :update, :destroy]

	# Render a timesheet based on the active day
	def index
		render json: current_user.find_timesheet_by_day(params[:active_day])
  end

	def show
		render json: @timesheet.get_sessions
  end

	def create
		# timesheet = Timesheet.where({start_date: find_recent_monday(params[:active_day])})[0]
		timesheet = current_user.timesheets.new(start_date: find_recent_monday(params[:active_day]))
		# unless timesheet
		# end
		if timesheet.save
			render json: timesheet
		else
			render json: timesheet.errors, status: 422
		end
  end

	def update
		if @timesheet.update(timesheet_params)
			render json: @timesheet.id
		else
			render json: @timesheet.errors, status: 422
		end
  end

	def destroy
		if @timesheet.timesheet_admins.includes(current_user.id)
			@timesheet.destroy
		else
			render status: 401
		end
	end
	
	private 
		def set_timesheet
			@timesheet = Timesheet.find(params[:id])
		end

		def find_recent_monday d
			d = DateTime.parse(d)
			date = d.beginning_of_day
			until date.wday == 1
				date = date.advance(days: -1)
			end
			date
		end
end
