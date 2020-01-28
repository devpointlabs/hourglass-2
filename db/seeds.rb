
a = User.create(
  email:'admin@hourglass.com',
	password: 'password',
	first_name: Faker::Name.first_name,
	last_name: Faker::Name.last_name,
	nickname: Faker::Creature::Animal.name
)
a1 = User.create(
  email:'admin1@hourglass.com',
	password: 'password',
	first_name: Faker::Name.first_name,
	last_name: Faker::Name.last_name,
	nickname: Faker::Creature::Animal.name
)

admins = [a, a1]
User.create(
  email:'standard@hourglass.com',
	password: 'password',
	first_name: Faker::Name.first_name,
	last_name: Faker::Name.last_name,
	nickname: Faker::Creature::Animal.name
)
random_users = []

7.times do
	random_users.push(User.all.sample.id)
	p random_users
end

random_users = random_users.clean

i = 0
5.times do 
	random_admin = admins.sample.id
	users = random_users - [random_users.sample] + [random_admin];
	users = users.clean
	project = Project.create(
		title: "Project#{i}",
		description: "This is a project test",
		client_name: "Me Foo",
		planned_start: DateTime.now,
		planned_end: nil,
		budget: 1000.00 * rand(12),
		complete: false,
		spent: 500.25 * rand(25),
		cost: 30.18 * rand(100),
		project_admins: [random_admin],
		all_users: users
	)
	3.times do 
		task = project.tasks.create(
			title: Faker::Job.title,
			description: Faker::Job.field,
			complete: false
		)
		sheet = Timesheet.create(
			start_date: Faker::Date.between(from: 14.days.ago, to: Date.today),
			user_id: a.id,
		)
		puts (sheet.set_sessions ['0:30','1:30', '2:00', '2:15', '1:00', '5:15', '1:15'], task.id, a.id)
	end

	User.all.each do |u|
		if project.all_users.include?(u.id)
			u.update(projects: u.projects.push(project.id))
		end
	end
	i+=1
end

puts "Test Projects Seeded!"

